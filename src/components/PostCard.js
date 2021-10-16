import React, {useContext, useState} from "react";
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

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageProgress from './ImageProgress';



const PostCard = ({item, onDelete, addFavorite}) => {
    const {user, logout} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    const likeIcon = item.favorite ? 'heart' : 'heart-outline';
    const likeIconColor = item.favorite ? '#2e64e5' : '#333';
  
    
  
  
    return(
        <Card >
                    <UserInfo>
                        <UserImg source={{uri: item.userImg}} />
                        <UserInfoText>
                            <UserName>{item.userName}</UserName>
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
        <Interaction active={item.favorite} onPress={() => addFavorite(item.id, item.favorite)}>
        <Ionicons name={likeIcon} size={25} color={likeIconColor} />
          {/* <InteractionText active={item.liked}>{likeText}</InteractionText> */}
        </Interaction>
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