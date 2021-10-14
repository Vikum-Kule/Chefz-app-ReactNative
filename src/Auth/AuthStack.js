import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from '../Screens/SignUp';
import LoginScreen from '../Screens/Login';
import OnboardScreen from '../Screens/OnboardScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

const AuthStack = () => {
  let routeName;
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(val => {
      if (val == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      }
      else {
        setIsFirstLaunch(false);
      }
    });
    return () => {
      setIsFirstLaunch();
    };
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch == true) {
    routeName = 'OnboardScreen';
  } else {
    routeName = 'Login';
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="OnboardScreen"
        component={OnboardScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  )
};

export default AuthStack;