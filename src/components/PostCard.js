import React, {useContext, useState, useEffect} from "react";
import { Container, 
    UserInfo, 
    UserImg, 
    Card, 
    UserName, 
    UserInfoText, 
    PostDate,
    InteractionWrapper,
    Interaction,
    InteractionText,
    Divide, 
    PostTitle, 
    PostImg } from "../styles/homeStyles";
    import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { AuthContext } from "../Auth/AuthProvider";

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageProgress from './ImageProgress';



const PostCard = ({item, onDelete, addFavorite}) => {
    const {user, logout} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [favorite, setFavorite] = useState(false);
    const likeIcon = favorite ? 'heart' : 'heart-outline';
    const likeIconColor = favorite ? '#2e64e5' : '#333';
  
    const checkFavorite = async () => {
      try {
        
        console.log("Hello");
        await firestore()
          .collection('favorite')
          .where('userId', '==', user.uid)
          .where('postId', '==', item.id)
          .get()
          .then((querySnapshot) => {
              if(!querySnapshot.empty){

                console.log("Exist"+ item.id);
                setFavorite(true);
              }
              else{
                console.log("not");
                setFavorite(false);
              }
          });
  
  
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
      checkFavorite();
    }, []);
  
  
    return(
        <Card >
                    <UserInfo>
                        <UserImg source={{uri: item.userImg}} />
                        <UserInfoText>
                            <UserName>{item.username ? item.username || 'Kamal Kumara' : ''}</UserName>
                            <PostDate>{item.postTime}</PostDate>
                        </UserInfoText>
                    </UserInfo>
                    <PostTitle>
                    {item.postTitle}
                    </PostTitle>
                    {item.postImg != null ? (
                    <ImageProgress
                    defaultImageSource={require('../assets/default-img.jpg')}
                    source={{uri: item.postImg}}
                    style={{width: '100%', height: 200}}
                    resizeMode="cover"
                    />
                    ) : (
                        <Divide />)}

        <InteractionWrapper>
        {/* <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <InteractionText>{commentText}</InteractionText>
        </Interaction> */}
        {user.uid == item.userId ? (
          <Interaction onPress={() => onDelete(item.id)}>
            <Ionicons name="md-trash-bin" size={25} />
          </Interaction>
        ) : null}
      </InteractionWrapper>
        </Card>
    )
};

export default PostCard;