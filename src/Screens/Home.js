import React, {useContext} from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import FormButton from "../components/FormButton";
import { Container, UserInfo, UserImg, Card, UserName, UserInfoText, PostDate, PostTitle, PostImg } from "../styles/homeStyles";
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () =>{
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
            <ScrollView style={styles.scrollCards}>
                <Card>
                    <UserInfo>
                        <UserImg source={require('../assets/user.png')} />
                        <UserInfoText>
                            <UserName>Jenny doe</UserName>
                            <PostDate>2021-10-15</PostDate>
                        </UserInfoText>
                    </UserInfo>
                    <PostTitle>
                        Special Rice Recipe
                    </PostTitle>
                    <PostImg source={require('../assets/banner/banner_1.jpeg')} />
                </Card>
            </ScrollView>
            
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
