import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { gray, lightGray }  from '../utils/colors';

export default function({ text }) {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18
  },
  container: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: gray,
    backgroundColor: lightGray,
    paddingLeft: 5,
    paddingRight: 5
  }
});