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
    const { quiz, deck } = this.props;
    console.log('quiz = ', quiz);

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

    return (
      <View>
        <Text>Quiz for {this.props.deck.id}</Text>
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;
  const { decks, quiz } = state;

  return {
    deck: { id: deckId, ...decks[deckId] },
    quiz: quiz
  }
}

export default connect(mapStateToProps)(Quiz);