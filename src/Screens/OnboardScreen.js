import React from "react";
import { View, Text, Button, StyleSheet, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardScreen = ({navigation}) => {
    return (
        <Onboarding
            onSkip= {()=> navigation.navigate("Login")}
            onDone= {()=> navigation.navigate("Login")}
            pages={[
                {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg')} />,
                title: 'Try Best Recipes',
                
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/gnocchi-with-prawns-and-chorizo-taste-152036-2.jpg')} />,
                    title: 'Make your life happy with healthy delicious foods',
                    
                },
            ]}
/>
    );
}

export default OnboardScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})