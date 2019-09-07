import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { RECEIVE_DECKS, receiveDecks } from '../actions';
import { getDecks } from '../utils/api';
import Deck from './Deck';

class DeckList extends React.Component {
  state = {
    isLoading: true
  }

  async componentDidMount() {
    const { dispatch } = this.props;

    this.isLoading = true;
    const decks = await getDecks();
    dispatch(receiveDecks(decks));
    this.setState(() => isLoading = false);
  }

  render() {
    const { decks } = this.props;
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
        />)}
      </View>
    );
  }
}

function mapStateToProps(decks) {
  const deckArr = [];
  Object.keys(decks).forEach(id => {
    deckArr.push({ id, ...decks[id] });
  });

  return {
    decks: deckArr
  };
}

export default connect(mapStateToProps)(DeckList);