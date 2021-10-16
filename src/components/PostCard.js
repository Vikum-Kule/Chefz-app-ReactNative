import React from "react";
import { Container, UserInfo, UserImg, Card, UserName, UserInfoText, PostDate, PostTitle, PostImg } from "../styles/homeStyles";
import { AuthContext } from "../Auth/AuthProvider";
import ImageProgress from './ImageProgress';


const PostCard = ({item}) => {
    return(
        <Card>
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
                        <Divider />)}
                </Card>
    )
};

export default PostCard;