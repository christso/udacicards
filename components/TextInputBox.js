import React from 'react';
import { TextInput } from 'react-native';

export default function ({ placeholder, onChangeText, style }) {
  return (
    <TextInput 
          style={{ marginTop: 10, height: 40, borderColor: 'gray', borderWidth: 1, ...style }}
          placeholder={placeholder}
          onChangeText={onChangeText} />
  )
}