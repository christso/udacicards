import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { purple, white } from '../utils/colors';
import { saveDeck } from '../utils/api';
import { connect } from 'react-redux';
import { addDeck } from '../actions/decks';
import SubmitBtn from '../components/SubmitBtn'; 
import TextInputBox from '../components/TextInputBox';
import styles from '../styles';

class AddDeck extends React.Component {
  state = {
    title: '',
    questions: []
  }

  submit = async () => {
    const deck = { ...this.state };
    await saveDeck(deck, deck.title);
    this.props.dispatch(addDeck(deck));
    this.setState(() => ({ title: '', questions: [] }));
    this.props.navigation.navigate(
      'DeckDetail',
      { deckId: deck.title }
    );
  }

  handleChangeTitle = (text) => {
    this.setState(() => ({ title: text }));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.screenTitle}>What is the title of your new Deck?</Text>
        <TextInputBox 
          placeholder='Deck Title'
          onChangeText={this.handleChangeTitle}
          value={this.state.title} />
        <SubmitBtn onPress={this.submit} text='Submit' />
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  return {
    navigation
  }
}

export default connect(mapStateToProps)(AddDeck);