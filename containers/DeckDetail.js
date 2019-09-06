import React from 'react';
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

class DeckDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: deckId
    };
  }

  render() {
    const { navigation, deckId } = this.props;

    return (
      <View>
        <Text>X Cards</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(
            'AddCard',
            { deckId }
          )}
        >
          <Text>Add Card</Text>
        </TouchableOpacity>
        <Text>Start Quiz</Text>
        <Text>Delete Deck</Text>
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const deckId = navigation.state.params;

  return {
    deckId
  }
}

export default connect(mapStateToProps)(DeckDetail);