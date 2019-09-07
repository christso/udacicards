import { START_QUIZ, SET_QUESTION_RESULT, END_QUIZ } from '../actions/quiz';

const defaultState = { deckId: null };

function quiz(state = defaultState, action) {
  switch (action.type) {
    case START_QUIZ:
      return {
        deckId: action.deckId,
        questions: action.questions
      };
    case SET_QUESTION_RESULT:
      const { questionText, result } = action;
      const question = state.find(q => q.question === questionText);
      
      return {
        ...state,
        questions: [
          ...state.questions.filter(q => q.question !== questionText),
          ...{ ...question, result }
        ]
      }
    case END_QUIZ:
      return defaultState;
    default:
      return state;
  }
}

export default quiz;