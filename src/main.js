import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, AsyncStorage} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardScreen from './Screens/OnboardScreen';
import Login from './Screens/Login';


const Stack = createStackNavigator();

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState (null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value =>{
      if(value == null){
        AsyncStorage.setItem('alreadyLaunched', true);
        setIsFirstLaunch(true);
      }
      else{
        setIsFirstLaunch(false);
      }
    })
  }, []);

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
