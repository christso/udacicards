import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Deck({ title }) {
  return (
    <View style={styles.deck}>
      <Text>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  deck: {
    flexDirection: 'row',
    marginTop: 5
  }
})