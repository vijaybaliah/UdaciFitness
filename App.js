import React, { Component } from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Constants from 'expo-constants';

import store from './store';
import { setLocalNotification } from './src/utils/helpers';
import History from './src/components/History';
import AddEntry from './src/components/AddEntry';
import { white, purple } from './src/utils/colors';
import EntryDetail from './src/components/EntryDetail';
import Live from './src/components/Live';
import Login from './src/components/Login';
import AuthLoadingScreen from './src/components/AuthLoadingScreen';
import SendBirdLogin from './src/screens/Sendbird/Login'
import Menu from './src/screens/Sendbird/Menu'
import Profile from './src/screens/Sendbird/Profile'
import OpenChannel from './src/screens/Sendbird/OpenChannel'
import ChatNew from './src/screens/Sendbird/ChatNew'


function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = {
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
  Live: {
    screen: Live,
    navigationOptions: {
      tabBarLabel: 'Live',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
    }
  }
}

const navigationOptions = {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const TabNav = Platform.OS === 'ios' ? createBottomTabNavigator(Tabs, navigationOptions) : createMaterialTopTabNavigator(Tabs, navigationOptions)
const AppStack = createStackNavigator({
  Home: {
    screen: TabNav,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: ({navigation}) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    })
  }
});

const AuthStack = createStackNavigator({ SignIn: Login });

const SendBirdStack = createStackNavigator({
  Login: {
    screen: SendBirdLogin,
  },
  Menu: {
    screen: Menu
  },
  Profile: {
    screen: Profile
  },
  OpenChannel: {
    screen: OpenChannel
  },
  Chat: {
    screen: ChatNew
  },
});
// const MainNavigator = createAppContainer(createSwitchNavigator(
const MainNavigator = createAppContainer(createStackNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    SendBird: SendBirdStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
))





export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
