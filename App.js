import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Constants from 'expo-constants';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import store from './store';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import DeckDetail from './components/DeckDetail';
import { white, purple } from './utils/colors';

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const TabNavigator = createBottomTabNavigator({
  Decks: {
    screen: DeckList
  },
  AddDeck: {
    screen: AddDeck
  }
});

const MainNavigator = createStackNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    }),
  }
})

const AppContainer = createAppContainer(MainNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
        <AppContainer />
      </View>
    </Provider>
  );
}