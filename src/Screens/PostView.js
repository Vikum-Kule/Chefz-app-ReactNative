import React, {useEffect, useRef, useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  Animated,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList
} from 'react-native';
import HeaderImageScrollView, {TriggeringView,} from 'react-native-image-header-scroll-view';
import ImageProgress from '../components/ImageProgress';
import { Container, 
    UserInfo, 
    UserImg, 
    Card, 
    UserName, 
    UserInfoText, 
    PostDate, 
    PostTitle,
    InputField, 
    Divider,
    SubmitBtn,
  SubmitBtnText,
    PostImg } from "../styles/homeStyles";
    import Ionicons from 'react-native-vector-icons/Ionicons';


import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { isTemplateElement, tsConstructorType } from '@babel/types';
import { AuthContext } from '../Auth/AuthProvider';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import CommentCard from '../components/CommentCard';


const PostView = ({route}) => {
  
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState(null);
  const [comments, setComments] = useState(null);
    
    useEffect(() => {
      setShow(false);
    }, []);

    const showModel = () =>{
      console.log("Hello model");
      if(show){
          setShow(false);
      }
      else{
          setShow(true);
      }
    }

    const item = route.params.item;


    
  const getUser = async() => {
    console.log(user.uid);
    await firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
      console.log('User Data', documentSnapshot);
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
  }

  useEffect(() => {
    getUser();
  }, []);

  const fetchComments = async () => {
    try {
      const list = [];

      await firestore()
        .collection('comments')
        .where('postId','==', item.id)
        .get()
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            
            const {
                comment,
                username,
                userId

            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              username,
              userImg:
                'https://cdn-icons-png.flaticon.com/512/149/149071.png',
              comment
            });
          });
        });

      setComments(list);

      if (loading) {
        setLoading(false);
      }

      console.log('comments: ', comments);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);


  const submitComment = async () => {

    firestore()
    .collection('comments')
    .add({
      userId: user.uid,
      username:userData.username,
      postId:item.id,
      comment: comment,
    })
    .then(() => {
      console.log('comments Added!');
      Alert.alert(
        'Comment added!',
      );
      setShow(false);
      setComment(null);
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });
  }




    const scrollA = useRef(new Animated.Value(0)).current;
    return (
      <View >


        <Animated.ScrollView
          style={styles.scroll}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollA}}}],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={16}
        >
          <View style={styles.bannerContainer}>
            <Animated.Image
              style={styles.banner(scrollA)}
              source={{uri: item.postImg}}
            />
          </View>
          <View styles={styles.titleContainer}>
            <Text style={styles.titleTxt}>{item.postTitle}</Text>
            <Divider />
            <UserInfo>
                        <UserImg source={{uri: item.userImg}} />
                        <UserInfoText>
                            <UserName>{item.userName}</UserName>
                            <PostDate>{item.postTime}</PostDate>
                        </UserInfoText>
            </UserInfo>
            <Divider />
            <Text style={styles.description}>
              {item.description}
            </Text>
          </View>
          <FlatList 
          scrollEnabled={false}
                    data={comments}
                    renderItem={
                        ({item})=> 
                        <TouchableOpacity
                          onPress={()=>{}}
                        >
                            <CommentCard 
                            item={item}
                            />
                        </TouchableOpacity>
                        
                    }
                    style={styles.scrollCards}
                    keyExtractor={item=> item.id}
                />
        </Animated.ScrollView>
        
        <TouchableOpacity
            style={{
              borderWidth: 0,
              borderColor: 'rgba(0,0,0,0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              position: 'absolute',
              bottom: 55,
              right: 10,
              height: 50,
              backgroundColor: '#f45c43',
              borderRadius: 100,
            }}
            onPress={showModel}
          >
              <Ionicons
              name="add"
              color={"#ffffff"}
              size={30}
            />
          </TouchableOpacity>
        <Modal
          transparent={true}
          visible={show}
        >
          <View style={{backgroundColor: "#000000aa", flex:1}}>
            <View style={{backgroundColor:"#ffffff", margin: 50, padding:40, borderRadius: 10, flex: 1}}>
            <InputField
              placeholder="Add Comment"
              multiline
              numberOfLines={6}
              value={comment}
              onChangeText={(content) => setComment(content)}
            />
            <SubmitBtn onPress={submitComment}>
            <SubmitBtnText>Add</SubmitBtnText>
          </SubmitBtn>
            </View>
          </View>
        </Modal>
        
      </View>
    );
};

export default PostView;

const styles = StyleSheet.create({

  titleContainer:{
      flex:1,
      alignItems:"center",
      
  },
  scroll:{
    marginBottom:50,
  },
  titleTxt:{
    fontSize:22,
    alignItems:"center",
    textAlign:"center",
    padding:20,
    fontWeight: "800",
    opacity: 0.7
  },
  description:{
    fontSize:18,
    padding:20,
  },

  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: 'center',
    overflow: 'hidden',
  },
  banner: scrollA => ({
    height: 350,
    width: '200%',
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-350, 0, 350, 350 + 1],
          outputRange: [-350 / 2, 0, 350 * 0.75, 350 * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-350, 0, 350, 350 + 1],
          outputRange: [2, 1, 0.5, 0.5],
        }),
      },
    ],
  }),
});