import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import View from '../components/View';
import { RECEIVE_DECKS, receiveDecks } from '../actions/decks';
import { getDecks } from '../utils/api';
import Deck from './Deck';

class DeckList extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;

    const decks = await getDecks();
    dispatch(receiveDecks(decks));
  }

  render() {
    const { decks, quizCompletions } = this.props;
    if (!decks || decks.length === 0) {
      return (
        <View>
          <Text>No decks found. Please add a deck.</Text>
        </View>
      )
    }

    return (
      <View>
        {decks.map(deck => 
          <Deck 
            key={deck.id} 
            id={deck.id}
            title={deck.title} 
            navigation={this.props.navigation}
            cardCount={deck.questions.length}
        />)}
        <Text style={{ marginTop: 20, textAlign: 'center' }}>{quizCompletions} quizes completed today.</Text>
      </View>
    );
  }
}

function mapStateToProps({ decks, quiz }) {
  const deckArr = [];
  Object.keys(decks).forEach(id => {
    deckArr.push({ id, ...decks[id] });
  });

  return {
    quizCompletions: quiz.completions,
    decks: deckArr
  };
}

export default connect(mapStateToProps)(DeckList);