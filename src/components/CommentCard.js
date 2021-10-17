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



const CommentCard = ({item}) => {
    const {user, logout} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [favorite, setFavorite] = useState(false);
  

  
  
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
                    {item.comment}
                    </PostTitle>
        </Card>
    )
};

export default CommentCard;