import React, {useContext, useState, useEffect} from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import FormButton from "../components/FormButton";
import { Container, UserInfo, UserImg, Card, UserName, UserInfoText, PostDate, PostTitle, PostImg } from "../styles/homeStyles";
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostCard from "../components/PostCard";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


const FavoriteList = ({navigation}) =>{
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
          const list = [];
    
          await firestore()
            .collection('posts')
            .where('favorite', '==', true)
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
                } = doc.data();
                list.push({
                  id: doc.id,
                  userId,
                  userName: 'Test Name',
                  userImg:
                    'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
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
                {posts && posts.length > 0 ? " Try Today Your Favorites" :  " Favorites empty"}
            </Text>
            </View>
            <FlatList 
                    data={posts}
                    renderItem={
                        ({item})=> <PostCard item={item} />
                    }
                    style={styles.scrollCards}
                    keyExtractor={item=> item.id}
                />
        </Container>
    );
}

export default FavoriteList;

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
