import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../Screens/Home';
import AddPostScreen from '../Screens/AddPostScreen';
import CategoryView from '../Screens/CategoryView';
import ProfileScreen from '../Screens/ProfileScreen';
import PostView from '../Screens/PostView';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FavoriteList from '../Screens/FavoriteList';
import EditProfile from '../Screens/EditProfile';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Feed = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
          fontWeight: "bold",
        },
        headerStyle: {
          backgroundColor:'#f45c43',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerRight: () => (
          <View style={{marginRight: 10}}>
            <FontAwesome5.Button
              name="heart"
              size={22}
              backgroundColor="#f45c43"
              color="#fff"
              onPress={() => navigation.navigate('Favorite')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="CategoryView"
      component={CategoryView}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
          fontWeight: "bold",
        },
        headerStyle: {
          backgroundColor:'#f45c43',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="Favorite"
      component={FavoriteList}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
          fontWeight: "bold",
        },
        headerStyle: {
          backgroundColor:'#f45c43',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="PostView"
      component={PostView}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="HomeProfile"
      component={ProfileScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f45c43',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const AddPost = ({navigation}) => (
  <Stack.Navigator>
    
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f45c43',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const Profile = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        headerTitle: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f45c43',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);


const AppStack = () => {

  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    return true;
  };


    return(
      <Tab.Navigator
        // tabBarOptions={{
        //   s
        // }}

      screenOptions={{
        activeTintColor: '#f45c43',
      }}>
      <Tab.Screen
        name="Home"
        component={Feed}
        options={({route}) => ({
          header: () => null ,
          tabBarLabel: 'Home',
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="addPost"
        component={AddPost}
        options={({route}) => ({
          header: () => null ,
          // tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          header: () => null ,
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
    );
}

export default AppStack;