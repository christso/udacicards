import { View, Text } from 'react-native';
import React from 'react';
import { lightPurp } from '../utils/colors';

export default function ({ children }) {
  return (
    <View style={{ flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: 10 }}>
      <View style={{ flex: 1 }}></View>
      <View style={{ 
        flex: 1, 
        justifyContent: 'center'}}>
          <View style={{ 
            borderWidth: 1, 
            borderColor: lightPurp,
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: 10,
            paddingBottom: 10 }}>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>{children}</Text>
          </View>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  )
}