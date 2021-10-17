import React, {useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  Animated
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
    Divider,
    PostImg } from "../styles/homeStyles";


import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const PostView = ({route}) => {
    const item = route.params.item;
    const scrollA = useRef(new Animated.Value(0)).current;
    return (
      <View>
        <Animated.ScrollView
          // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
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
        </Animated.ScrollView>
      </View>
    );
};

export default PostView;

const styles = StyleSheet.create({

  titleContainer:{
      flex:1,
      alignItems:"center",
      
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