import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';

class DeckDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: deckId
    };
  }
  
  render() {
    return (
      <View>
        <Text>X Cards</Text>
        <Text>Add Card</Text>
        <Text>Start Quiz</Text>
        <Text>Delete Deck</Text>
      </View>
    )
  }
}

function mapStateToProps(state, { navigation}) {
  const deckId = navigation.state.params;

  return {
    deckId
  }
}

export default connect(mapStateToProps)(DeckDetail);