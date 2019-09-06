import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import SubmitBtn from '../components/SubmitBtn';
import TextInputBox from '../components/TextInputBox';

class AddCard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card'
    };
  }

  render() {
    return (
      <View>
        <TextInputBox placeholder='Question' />
        <TextInputBox placeholder='Answer' />
        <SubmitBtn text='Submit' />
      </View>
    )
  }
}

export default AddCard;