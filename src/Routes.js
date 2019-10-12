import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import FeedScreen from "./screens/FeedScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from './screens/RegisterScreen';
import PostScreen from './screens/PostScreen';
import AddPostScreen from './screens/AddPostScreen';
import ProfileScreen from './screens/ProfileScreen';

const Project= createStackNavigator({
  Login: {
   screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  Feed: {
    screen: FeedScreen,
  },
  Post: {
    screen: PostScreen,
  },
  AddPost: {
    screen: AddPostScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },

});
export default createAppContainer(Project);