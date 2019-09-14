import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { gray } from '../utils/colors';

export default function Deck({ id, title, cardCount, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(
        'DeckDetail',
        { deckId: id }
      )}
    >
      <View style={styles.deck}>
        <Text style={styles.deckHeading}>{title}</Text>
        <Text style={styles.cardStat}>{cardCount} {cardCount == 1 ? 'card' : 'cards'}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  deck: {
    flexDirection: 'column',
    marginTop: 12,
    borderColor: gray,
    borderBottomWidth: 1
  },
  deckHeading: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  cardStat: {
    marginTop: 6
  }
})