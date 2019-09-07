import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { gray } from '../utils/colors';

export default function Deck({ id, title, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(
        'DeckDetail',
        { deckId: id }
      )}
    >
      <View style={styles.deck}>
        <Text style={styles.deckHeading}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  deck: {
    flexDirection: 'row',
    marginTop: 12,
    borderColor: gray,
    borderBottomWidth: 1
  },
  deckHeading: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})