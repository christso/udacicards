import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createAppContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import store from './store';
import DeckList from './containers/DeckList';
import AddDeck from './containers/AddDeck';
import DeckDetail from './containers/DeckDetail';
import AddCard from './containers/AddCard';
import Settings from './containers/Settings';
import { white, purple } from './utils/colors';
import Quiz from './containers/Quiz';
import { setLocalNotification } from './utils/helpers';

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
  },
  Settings: {
    screen: createStackNavigator({
      Settings: {
        screen: Settings,
        navigationOptions: {
          headerTintColor: white, 
          headerStyle: {
            backgroundColor: purple,
          },
          headerTitle: 'Settings'
        }
      }
    }),
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-settings' size={30} color={tintColor} />
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
    navigationOptions: stackNavigationOptions   
    // navigationOptions: {
    //   header: null
    // }
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
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: stackNavigationOptions
  }
})

const AppContainer = createAppContainer(MainNavigator);

class ReduxApp extends React.Component {
  componentDidMount() {
    const { hour, minute } = this.props.quizReminder;
    setLocalNotification(hour, minute);
  }

  render() {
    return (
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <AppContainer />
        </View>
    );
  }
}

const ConnectedReduxApp = connect(mapStateToProps)(ReduxApp);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedReduxApp />
      </Provider>
    )
  }
}

function mapStateToProps({ quizReminder }) {
  return {
    quizReminder
  };
}
