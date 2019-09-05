import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { purple, white } from '../utils/colors';
import { saveDeck } from '../utils/api';
import { connect } from 'react-redux';

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends React.Component {
  state = {
    question: '',
    answer: ''
  }

  submit = async () => {
    await saveDeck();   
    
    console.log('pressed!');
  }

  handleChangeQuestionText(text) {
    console.log('question text: ', text);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput 
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder='Your question'
          onChangeText={this.handleChangeQuestionText} />

        <TextInput 
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder='Your answer' />

        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }  
})

export default connect()(AddDeck);