import React from 'react';
import { View } from 'react-native';

export default function({ children, ...props }) {
  return (
    <View style={{ padding: 10 }} {...props}>
      {children}
    </View>
  )
}