import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { purple, white } from '../utils/colors';

export default function SubmitBtn({ onPress, text, style }) {
  return (
    <TouchableOpacity
      style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, style]}
      onPress={onPress}>
        <Text style={[Platform.OS === 'ios' ? styles.iosSubmitBtnText : styles.androidSubmitBtnText, style]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  iosSubmitBtnText: {
    color: white,
    fontSize: 18,
    textAlign: 'center'
  },
  androidSubmitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
})
