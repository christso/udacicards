import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import CenteredText from '../components/CenteredText';
import SubmitBtn from '../components/SubmitBtn';
import { setQuestionResult, startQuiz, completeQuiz } from '../actions/quiz';

const AnswerCard = ({ handleResultPressed, question }) => {
  return (
    <View>
      <Text>{question.answer}</Text>
      <SubmitBtn text='Correct' onPress={() => handleResultPressed(question.question, 'correct')} />
      <SubmitBtn text='Incorrect' onPress={() => handleResultPressed(question.question, 'incorrect')} />
    </View>
  )
}

const QuestionCard = ({ question, onShowAnswer }) => {
  return (
    <View>
      <Text>{question.question}</Text>
      <SubmitBtn text='Show Answer' onPress={onShowAnswer} />
    </View>
  )
}

const QuizResult = ({ correctAnswers, questionTotal, onRestart, onExit }) => {
  return (
    <View>
      <Text>Quiz results:</Text>
      <Text>{Math.round(correctAnswers / questionTotal * 100)}%</Text>
      <Text>{correctAnswers} / {questionTotal}</Text>
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
    const { dispatch, questionTotal, deck } = this.props;

    this.setState((state) => {
      if (state.questionNum + 1 < questionTotal) {
        return {
          questionNum: state.questionNum + 1,
          showAnswer: false
        };
      }

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
    dispatch(startQuiz(deck.id, deck.questions)); // extract common method with DeckDetail
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

    return (
      <View>
        {this.state.showAnswer
          ? <AnswerCard handleResultPressed={this.handleResultPressed} question={question} />
          : <QuestionCard question={question} onShowAnswer={this.showAnswer} />
        }
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
    questionTotal,
    navigation
  }
}

export default connect(mapStateToProps)(Quiz);