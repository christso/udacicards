import React from 'react';
import { View } from 'react-native';
import { lightPurp } from '../utils/colors';

export default function () {
  return <View
    style={{
      borderBottomColor: lightPurp,
      borderBottomWidth: 1,
    }}
  />
}