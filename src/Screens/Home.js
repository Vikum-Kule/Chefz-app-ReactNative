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


const Posts = [
    {
        id: '1',
        userName: 'Jon Doe',
        userImg: require('../assets/user.png'),
        postTime: '2021-10-10',
        postTitle: 'Special Rice Recipe',
        postImg: require('../assets/banner/banner_1.jpeg')
    },
    {
        id: '2',
        userName: 'Samanthi',
        userImg: require('../assets/user.png'),
        postTime: '2021-10-07',
        postTitle: 'Ice cream recipe',
        postImg: require('../assets/banner/banner_2.jpg')
    },
    {
        id: '3',
        userName: 'Kanthi',
        userImg: require('../assets/user.png'),
        postTime: '2021-10-08',
        postTitle: 'How to make milkshake',
        postImg: require('../assets/banner/banner_3.jpg')
    }
];

const HomeScreen = ({navigation}) =>{
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
          const list = [];
    
          await firestore()
            .collection('posts')
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
            <View style={styles.top}>
                <Text style={styles.toptxt}>What are you going to cook today?</Text>
            </View>
            <View style={styles.sliderContainer}>
            <Swiper height={150} autoplay activeDotColor="#f45c43">
                <View style={styles.slide}>
                    <Image 
                       source= {require('../assets/banner/banner_0.jpg')}
                       resizeMode='cover'
                       style={styles.sliderImage} 
                    />
                </View>
                <View style={styles.slide}>
                    <Image 
                       source= {require('../assets/banner/banner_1.jpeg')}
                       resizeMode='cover'
                       style={styles.sliderImage} 
                    />
                </View>
                <View style={styles.slide}>
                    <Image 
                       source= {require('../assets/banner/banner_2.jpg')}
                       resizeMode='cover'
                       style={styles.sliderImage} 
                    />
                </View>
                <View style={styles.slide}>
                    <Image 
                       source= {require('../assets/banner/banner_3.jpg')}
                       resizeMode='cover'
                       style={styles.sliderImage} 
                    />
                </View>
            </Swiper>
            </View>
            <View style={styles.categoryContainer}>
                <ScrollView style={styles.scrollView} 
                    horizontal={true}
                >
                    <TouchableOpacity style={styles.categorybtn} onPress={()=>{}}>
                        <View style={styles.category}>
                            <Text style={styles.Categorytext}>Rice</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categorybtn} onPress={()=>{}}>
                        <View style={styles.category}>
                            <Text style={styles.Categorytext}>Noodls</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categorybtn} onPress={()=>{}}>
                        <View style={styles.category}>
                            <Text style={styles.Categorytext}>Desserts</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categorybtn} onPress={()=>{}}>
                        <View style={styles.category}>
                            <Text style={styles.Categorytext}>Juices</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categorybtn} onPress={()=>{}}>
                        <View style={styles.category}>
                            <Text style={styles.Categorytext}>Other</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView> 
            </View>
            <FlatList 
                    data={posts}
                    renderItem={
                        ({item})=> <PostCard item={item} />
                    }
                    style={styles.scrollCards}
                    keyExtractor={item=> item.id}
                />
            {/* <ScrollView style={styles.scrollCards}>
                <FlatList 
                    data={Posts}
                    renderItem={
                        ({item})=> <PostCard item={item} />
                    }
                    keyExtractor={item=> item.id}
                />
            </ScrollView> */}
            
        </Container>
    );
}

export default HomeScreen;

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
      }

});
