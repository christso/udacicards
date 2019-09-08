import React from 'react';
import { TextInput } from 'react-native';

export default function ({ placeholder, onChangeText, value, style }) {
  return (
    <TextInput 
          style={{ 
            marginTop: 10, 
            height: 40, 
            borderColor: 'gray', 
            borderWidth: 1,
            paddingLeft: 5,
            paddingRight: 5, 
            ...style }}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value} />
  )
}