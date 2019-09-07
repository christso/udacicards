import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import SubmitBtn from '../components/SubmitBtn';
import { setQuestionResult } from '../actions/quiz';

class Quiz extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: deckId + ' Quiz'
    };
  }

  state = {
    questionNum: 0,
    isFinished: false
  }

  nextQuestion = () => {
    const { questionTotal } = this.props;
 
    this.setState((state) => {
      if (state.questionNum + 1 < questionTotal) {
        return { questionNum: state.questionNum + 1 };
      }
      return { ...state, isFinished: true };
    });
  }

  handleResultPressed = (questionText, result) => {
    this.props.dispatch(setQuestionResult(questionText, result));
    this.nextQuestion();
  }

  chooseQuestion() {
    return this.props.quiz.questions.find(q => !q.result);
  }

  render() {
    const { quiz, deck, questionTotal } = this.props;
    const questionNum = this.state.questionNum;

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

    if (this.state.isFinished) {
      return (
        <View>
          <Text>Quiz results:</Text>
        </View>
      )
    }

    const question =  this.chooseQuestion();

    return (
      <View>
        <Text>Quiz for {deck.id}</Text>
        <Text>{question.question}</Text>
        <Text>{question.answer}</Text>
        <SubmitBtn text='Correct' onPress={() => this.handleResultPressed(question.question, 'correct')} />
        <SubmitBtn text='Incorrect' onPress={() => this.handleResultPressed(question.question, 'incorrect')} />
        <Text>{questionNum + 1} / {questionTotal}</Text>
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