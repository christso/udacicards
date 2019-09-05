import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Deck({ title, navigation }) {
  return (
    <View style={styles.deck}>
      <TouchableOpacity
        onPress={() => navigation.navigate(
          'DeckDetail',
          { deckId: title }
        )}
      >
        <Text>{title}</Text>
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
  deck: {
    flexDirection: 'row',
    marginTop: 5
  }
})