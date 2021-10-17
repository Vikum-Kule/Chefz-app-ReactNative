import React, {useContext, useState, useEffect} from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, Alert} from 'react-native';
import FormButton from "../components/FormButton";
import { Container, UserInfo, UserImg, Card, UserName, UserInfoText, PostDate, PostTitle, PostImg } from "../styles/homeStyles";
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostCard from "../components/PostCard";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../Auth/AuthProvider';


const CategoryView = ({route, navigation}) =>{
  const {user, logout} = useContext(AuthContext);
    const { category } = route.params;
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleted, setDeleted] = useState(false);

    const addFavorite = (postId, value)=>{
      console.log(user.username);
      if(value){
        firestore()
        .collection('favorite')
        .doc(postId)
        .delete()
        .then(() => {
          Alert.alert(
            'Post Removed from favorite list',
          );
          setDeleted(true);
        })
        .catch((e) => console.log('Error deleting .', e));
      }
      else{
        firestore()
        .collection('favorite')
        .add({
          userId: user.uid,
          postId: postId,
        })
        .then(() => {
          console.log('Post Added!');
          Alert.alert(
            'Post added to favorite list',
          );
        })
        .catch((error) => {
          console.log('Something went wrong .', error);
        });
      }
      

    }


    const handleDelete = (postId) => {
      Alert.alert(
        'Delete post',
        'Are you sure?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed!'),
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => deletePost(postId),
          },
        ],
        {cancelable: false},
      );
    };
  
    const deletePost = (postId) => {
      console.log('Current Post Id: ', postId);
  
      firestore()
        .collection('posts')
        .doc(postId)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            const {postImg} = documentSnapshot.data();
  
            if (postImg != null) {
              const storageRef = storage().refFromURL(postImg);
              const imageRef = storage().ref(storageRef.fullPath);
  
              imageRef
                .delete()
                .then(() => {
                  console.log(`${postImg} has been deleted successfully.`);
                  deleteFirestoreData(postId);
                })
                .catch((e) => {
                  console.log('Error while deleting the image. ', e);
                });
              // If the post image is not available
            } else {
              deleteFirestoreData(postId);
            }
          }
        });
    };
  
    const deleteFirestoreData = (postId) => {
      firestore()
        .collection('posts')
        .doc(postId)
        .delete()
        .then(() => {
          Alert.alert(
            'Post deleted!',
            'Your post has been deleted successfully!',
          );
          setDeleted(true);
        })
        .catch((e) => console.log('Error deleting posst.', e));
    };


    const fetchPosts = async () => {
        try {
          const list = [];
    
          await firestore()
            .collection('posts')
            .where('category', '==', category)
            .orderBy('postTime', 'desc')
            .get()
            .then((querySnapshot) => {
              // console.log('Total Posts: ', querySnapshot.size);
    
              querySnapshot.forEach((doc) => {
                const {
                    userId,
                    postTitle,
                    postImg,
                    postTime,
                    category,
                    description,
                    favorite,
                    username
                } = doc.data();
                list.push({
                  id: doc.id,
                  userId,
                  username,
                  userImg:
                    'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                  postTime: "2021-10-14",
                  postTitle,
                  postImg,
                  category,
                  description,
                  favorite,
                });
              });
            });
    
          setPosts(list);
    
          if (loading) {
            setLoading(false);
          }
    
          console.log('Posts: ', posts);
        } catch (e) {
          console.log(e);
        }
      };

      useEffect(() => {
        fetchPosts();
      }, []);

    return (
        <Container>
            <View>
            <Text style={styles.topTxt}>
                {posts && posts.length > 0 ? category+ " recipes" : category+ " recipes not available"}
            </Text>
            </View>
            <FlatList 
                    data={posts}
                    renderItem={
                        ({item})=> 
                        <TouchableOpacity
                        onPress={() => {
                            console.log(item.username);
                            navigation.navigate('PostView', {
                                item:item
                            });}}
                        >
                            <PostCard 
                            item={item}
                            onDelete={handleDelete}
                            addFavorite={addFavorite}
                            />
                        </TouchableOpacity>
                        
                    }
                    style={styles.scrollCards}
                    keyExtractor={item=> item.id}
                />
        </Container>
    );
}

export default CategoryView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },

      top:{
        height:40,
        alignItems:"center",
      },
      toptxt:{
        fontSize:20,
        fontWeight: "800",
        opacity: 0.5
      },

      sliderContainer: {
        height: 150,
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
      },
    
      wrapper: {},
    
      slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
      },
      sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
      },
      category:{
        height: '100%',
        borderRadius: 8,
        
      },
      categorybtn:{
          backgroundColor:"#f45c43",
          flex: 1,
            width: '30%',
            marginHorizontal: 5,
            alignSelf: 'center',
            borderRadius:20,
            paddingLeft:20,
            paddingRight:20,
            paddingTop:9
      },
      categoryContainer:{
        flexDirection: 'column',
        width: '100%',
        height:40,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        
      },
      Categorytext:{
          textAlign:"center",
          color:"#fff",
          fontSize:15,
          fontWeight:"bold",
          alignSelf:"center"
      },
      scrollCards:{
          width:"100%"
      },
      topTxt:{
        fontSize: 20,
        fontWeight:"bold",
        padding:10,
      }

});
