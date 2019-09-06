import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { purple, white } from '../utils/colors';
import { saveDeck } from '../utils/api';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import SubmitBtn from '../components/SubmitBtn'; 
import TextInputBox from '../components/TextInputBox';

class AddDeck extends React.Component {
  state = {
    title: '',
    questions: []
  }

  submit = async () => {
    await saveDeck(this.state, this.state.title); // TODO: simplfiy parameters
    this.props.dispatch(addDeck(this.state));   
  }

  handleChangeTitle = (text) => {
    this.setState(() => ({ title: text }));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInputBox 
          placeholder='Title'
          onChangeText={this.handleChangeTitle} />

        <SubmitBtn onPress={this.submit} text='Submit' />
      </View>
    )
  }
}

export default connect()(AddDeck);