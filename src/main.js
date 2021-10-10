import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardScreen from './Screens/OnboardScreen';
import Login from './Screens/Login';


const Stack = createStackNavigator();

const App = () => {
  

  const [isFirstLaunch, setIsFirstLaunch] = useState (true);

  const checkOnboarding = async () => {
    try{
      const value = await AsyncStorage.getItem('@isFirstLaunch');

      if(value !== null){
        setIsFirstLaunch(true);
      }

    }catch(err){
        console.log(err);
    }
  }
  useEffect(() => {
    checkOnboarding();
  }, []);

  // useEffect(() => {
  //   AsyncStorage.getItem('alreadyLaunched').then(value =>{
  //     if(value == null){
  //       AsyncStorage.setItem('alreadyLaunched', true);
  //       setIsFirstLaunch(true);
  //     }
  //     else{
  //       setIsFirstLaunch(false);
  //     }
  //   })
  // }, []);

  if( isFirstLaunch === null){
    return null;
  }
  else if( isFirstLaunch === true){
    return(
      <NavigationContainer>
        <Stack.Navigator
          headerMode = "none"
        > 
          <Stack.Screen name = "OnboardScreen" component = {OnboardScreen} />
          <Stack.Screen name = "Login" component = {Login} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  else{
    return <Login />;
  }
}

export default App;
