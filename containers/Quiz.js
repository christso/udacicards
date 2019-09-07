import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class Quiz extends React.Component {
  render() {
    return(
      <View>
        <Text>Quiz for {this.props.deck.id}</Text>
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deck: { id: deckId, ...state[deckId] }
  }
}

export default connect(mapStateToProps)(Quiz);