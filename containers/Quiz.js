import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class Quiz extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: deckId + ' Quiz'
    };
  }


  componentDidMount() {

  }

  render() {
    const { quiz, deck, questionTotal } = this.props;
    const questionNum = quiz.questionNum;

    if (!deck || !deck.id ) {
      return (
        <View>
          <Text>No deck to quiz!</Text>
        </View>
      )
    }

    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
      return (
        <View>
          <Text>No questions to quiz!</Text>
        </View>
      )
    }

    const question = quiz.questions[questionNum];

    return (
      <View>
        <Text>Quiz for {deck.id}</Text>
        <Text>{question.question}</Text>
        <Text>{question.answer}</Text>
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;
  const { decks, quiz } = state;
  const deck = { id: deckId, ...decks[deckId] };
  const questionTotal = deck.questions.length;

  return {
    deck,
    quiz,
    questionTotal
  }
}

export default connect(mapStateToProps)(Quiz);