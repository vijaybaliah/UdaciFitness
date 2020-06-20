import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch } from "react-redux";
import { USER } from '../utils/constants';
import { updateUserInfo } from '../actions'

const AuthLoadingScreen = (props) => {
  const dispatch = useDispatch();
  // Fetch the token from storage then navigate to our appropriate place
  const bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem(USER);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    if (userToken) {
      try {
        const user = JSON.parse(userToken);
        dispatch(updateUserInfo({ user }))
      } catch (e) {
        console.log('bootstrapAsync Error: ', e);
      }
    }
    props.navigation.navigate(userToken ? 'App' : 'Auth');
    
  };

  bootstrapAsync();
  // Render any loading content that you like here
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}

export default AuthLoadingScreen;
