import React from 'react';
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SubmitBtn from '../components/SubmitBtn';
import { removeDeck } from '../utils/api';
import { removeDeck as removeDeckAction } from '../actions/decks';
import { startQuiz } from '../actions/quiz';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { red } from '../utils/colors';

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
    const { navigation, deck, dispatch, quizReminder } = this.props;
    dispatch(startQuiz(deck.id, deck.questions)); // TODO: select a subset of questions

    navigation.navigate(
      'Quiz',
      {
        deckId: deck.id
      }
    )

    clearLocalNotification()
      .then(setLocalNotification(quizReminder.hour, quizReminder.minute));
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
        <Text style={{ textAlign: 'center', marginTop: 10 }}>{numOfCards} card{numOfCards === 1 ? '' : 's'}</Text>
        <SubmitBtn text='Add Card' onPress={() => navigation.navigate('AddCard', { deckId })} />
        <SubmitBtn text='Start Quiz' onPress={this.handleStartQuizPressed} />
        <Text style={styles.deleteBtn} onPress={this.handleDeleteDeckPressed}>Delete Deck</Text>
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { decks, quizReminder } = state;
  const { deckId } = navigation.state.params;

  return {
    deck: { id: deckId, ...decks[deckId] },
    quizReminder
  }
}

const styles = StyleSheet.create({
  deleteBtn: {
    color: red,
    fontSize: 22,
    textAlign: 'center',
    marginTop: 30
  }
});

export default connect(mapStateToProps)(DeckDetail);