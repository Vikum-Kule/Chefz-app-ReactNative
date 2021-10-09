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
                title: 'Onboarding 1',
                subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/gnocchi-with-prawns-and-chorizo-taste-152036-2.jpg')} />,
                    title: 'Onboarding 2',
                    subtitle: 'Done with React Native Onboarding Swiper',
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