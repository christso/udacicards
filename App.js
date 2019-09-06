import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Constants from 'expo-constants';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import store from './store';
import DeckList from './containers/DeckList';
import AddDeck from './containers/AddDeck';
import DeckDetail from './containers/DeckDetail';
import AddCard from './containers/AddCard';
import { white, purple } from './utils/colors';

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const stackNavigationOptions = ({ navigation }) => ({
  headerTintColor: white,
  headerStyle: {
    backgroundColor: purple,
  }
});

const TabNavigator = createBottomTabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
},
{
  navigationOptions: {
    header: null
  },
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
    navigationOptions: stackNavigationOptions,
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: stackNavigationOptions
  },
  DeckList: {
    screen: DeckList,
    navigationOptions: stackNavigationOptions
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