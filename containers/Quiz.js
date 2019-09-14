import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text } from 'react-native';
import View from '../components/View';
import CenteredText from '../components/CenteredText';
import SubmitBtn from '../components/SubmitBtn';
import HorizontalRule from '../components/HorizontalRule';
import { setQuestionResult, startQuiz, completeQuiz } from '../actions/quiz';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

import { red, green } from '../utils/colors';

const AnswerCard = ({ handleResultPressed, question }) => {
  return (
    <View>
      <View>
        <Text style={{ marginBottom: 10, textAlign: 'center', fontSize: 20 }}>{question.question}</Text>
        <HorizontalRule />
        <Text style={{ marginTop: 10, marginBottom: 10, textAlign: 'center', fontSize: 20 }}>{question.answer}</Text>
      </View>
      <View style={{ marginTop: 20, flex: 1, flexDirection: 'row'  }}>
        <SubmitBtn text='Correct' onPress={() => handleResultPressed(question.question, 'correct')}
          style={{ backgroundColor: green, marginLeft: 10, marginRight: 10 }} />
        <SubmitBtn text='Incorrect' onPress={() => handleResultPressed(question.question, 'incorrect')} 
          style={{ backgroundColor: red, marginLeft: 10, marginRight: 10 }} />
      </View>
    </View>
  )
}

const QuestionCard = ({ question, onShowAnswer }) => {
  return (
    <View>
      <View>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>{question.question}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <SubmitBtn text='Show Answer' onPress={onShowAnswer} />
      </View>
    </View>
  )
}

const QuizResult = ({ correctAnswers, questionTotal, onRestart, onExit }) => {
  return (
    <View>
      <Text style={{ fontSize: 20, textAlign: 'center' }}>Your result:</Text>
      <Text style={{ fontSize: 25, textAlign: 'center', margin: 20 }}>{Math.round(correctAnswers / questionTotal * 100)}%</Text>
      <Text style={{ textAlign: 'center' }}>You answered {correctAnswers} out of {questionTotal} questions correctly.</Text>
      <View style={{ margin: 10 }} />
      <SubmitBtn text='Restart Quiz' onPress={onRestart} />
      <SubmitBtn text='Back to Deck' onPress={onExit} />
    </View>
  )
}

class Quiz extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: deckId + ' Quiz'
    };
  }

  state = {
    questionNum: 0,
    isFinished: false,
    showAnswer: false
  }

  reset = () => {
    this.setState({
      questionNum: 0,
      isFinished: 0,
      showAnswer: false
    })
  }

  nextQuestion = () => {
    const { dispatch, questionTotal, deck, quizReminder } = this.props;

    this.setState((state) => {
      if (state.questionNum + 1 < questionTotal) {
        return {
          questionNum: state.questionNum + 1,
          showAnswer: false
        };
      }
      
      // when quiz is completed:
      clearLocalNotification()
        .then(setLocalNotification(quizReminder.hour, quizReminder.minute));
      dispatch(completeQuiz(deck.id));
      return { ...state, isFinished: true };
    });
  }

  showAnswer = () => {
    this.setState(() => ({
      showAnswer: true
    }));
  }

  handleResultPressed = (questionText, result) => {
    this.props.dispatch(setQuestionResult(questionText, result));
    this.nextQuestion();
  }

  handleRestart = () => {
    const { dispatch, deck } = this.props;
    dispatch(startQuiz(deck.id, deck.questions));
    this.reset();
  }

  handleExit = () => {
    const { navigation, deck } = this.props;
    navigation.navigate(
      'DeckDetail',
      { deckId: deck.id }
    );
  }

  chooseQuestion() {
    return this.props.quiz.questions.find(q => !q.result);
  }

  render() {
    const { quiz, deck, questionTotal } = this.props;
    const questionNum = this.state.questionNum;

    if (!deck || !deck.id) {
      return (
        <CenteredText>No deck to quiz!</CenteredText>
      )
    }

    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
      return (
        <CenteredText>Sorry, you cannot take a quiz because there are no cards in the deck.</CenteredText>
      )
    }

    if (this.state.isFinished) {
      const correctAnswers = quiz.questions.filter(q => q.result === 'correct').length;
      return (
        <QuizResult
          correctAnswers={correctAnswers}
          questionTotal={questionTotal}
          onRestart={this.handleRestart}
          onExit={this.handleExit} />
      )
    }

    const question = this.chooseQuestion();

    const questionsRemaining = questionTotal - questionNum;

    return (
      <View>
        <Text style={{ textAlign: 'center', marginTop: 10 }}>
          {questionsRemaining} of {questionTotal} questions remaining
        </Text>
        {this.state.showAnswer
            ? <AnswerCard handleResultPressed={this.handleResultPressed} question={question} />
            : <QuestionCard question={question} onShowAnswer={this.showAnswer} />
        }
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { quizReminder } = state;
  const { deckId } = navigation.state.params;
  const { decks, quiz } = state;
  const deck = { id: deckId, ...decks[deckId] };
  const questionTotal = deck.questions.length;

  return {
    deck,
    quiz,
    questionTotal,
    quizReminder,
    navigation
  }
}

export default connect(mapStateToProps)(Quiz);