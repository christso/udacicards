import React from 'react';
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SubmitBtn from '../components/SubmitBtn';
import { removeDeck } from '../utils/api';
import { removeDeck as removeDeckAction } from '../actions';

class DeckDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: deckId
    };
  }

  handleDeleteDeckPressed = async () => {
    const { navigation, deckId, dispatch } = this.props;
    await removeDeck(deckId);
    dispatch(removeDeckAction(deckId));
    navigation.navigate(
       'DeckList'
    );
  }

  render() {
    const { navigation, deck } = this.props;
    const { deckId } = deck;
    const numOfCards = deck.questions.length;

    return (
      <View>
        <Text>{numOfCards} card{numOfCards === 1 ? '' : 's'}</Text>
        <SubmitBtn text='Add Card' onPress={() => navigation.navigate('AddCard', { deckId })} />
        <SubmitBtn text='Start Quiz' />
        <SubmitBtn text='Delete Deck' onPress={this.handleDeleteDeckPressed} />
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(DeckDetail);