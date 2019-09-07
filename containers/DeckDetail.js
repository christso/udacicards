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
    const { navigation, deck, dispatch } = this.props;
    await removeDeck(deck.id);
    dispatch(removeDeckAction(deck.id));
    navigation.navigate(
       'DeckList'
    );
  }

  handleStartQuizPressed = async () => {
    const { navigation, deck } = this.props;

    navigation.navigate(
      'Quiz',
      {
        deckId: deck.id
      }
    )
  }

  render() {
    const { navigation, deck } = this.props;
    
    if (!deck) {
      return null;
    }
    
    const deckId = deck.id;
    const numOfCards = deck.questions ? deck.questions.length : 0;

    return (
      <View>
        <Text>{numOfCards} card{numOfCards === 1 ? '' : 's'}</Text>
        <SubmitBtn text='Add Card' onPress={() => navigation.navigate('AddCard', { deckId })} />
        <SubmitBtn text='Start Quiz' onPress={this.handleStartQuizPressed} />
        <SubmitBtn text='Delete Deck' onPress={this.handleDeleteDeckPressed} />
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

export default connect(mapStateToProps)(DeckDetail);