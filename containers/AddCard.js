import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import View from '../components/View';
import SubmitBtn from '../components/SubmitBtn';
import TextInputBox from '../components/TextInputBox';
import { addCard } from '../utils/api';
import { addCard as addCardAction } from '../actions/decks'

class AddCard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: `Add Card to ${deckId}`
    };
  }

  state = {
    question: '',
    answer: ''
  }

  handleQuestionTextChange = (text) => {
    this.setState((state) => ({
      ...state,
      question: text
    }));
  }

  handleAnswerTextChange = (text) => {
    this.setState((state) => ({
      ...state,
      answer: text
    }));
  }

  submit = async () => {
    const { dispatch, deckId } = this.props;

    await addCard(deckId, this.state);
    dispatch(addCardAction(deckId, this.state));
    this.props.navigation.navigate(
      'DeckDetail',
      { deckId: deckId }
    );
  }

  render() {
    const { deckId } = this.props;
    

    if (!deckId) {
      return (
        <View>
          <Text>Deck '{deckId}' does not exist! Please 'Add Deck' before you 'Add Card'.</Text>
        </View>
      )
    }

    return (
      <View>
        <TextInputBox placeholder='Question' onChangeText={this.handleQuestionTextChange} />
        <TextInputBox placeholder='Answer' onChangeText={this.handleAnswerTextChange} />
        <SubmitBtn text='Submit' onPress={this.submit} />
      </View>
    )
  }
}


function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deckId
  }
}

export default connect(mapStateToProps)(AddCard);