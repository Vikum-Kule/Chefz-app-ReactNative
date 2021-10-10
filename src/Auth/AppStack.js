import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screens/Home';

const Stack = createStackNavigator();

const AppStack = () => {
    return(
        <Stack.Navigator> 
          <Stack.Screen name = "Home" component = {Home} />
        </Stack.Navigator>
    );
}

export default AppStack;