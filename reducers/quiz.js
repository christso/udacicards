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
      const question = state.questions.find(q => q.question === questionText);
      const otherQuestions = state.questions.filter(q => q.question !== questionText);
      const thisQuestion = { ...question, result };
      
      return {
        ...state,
        questions: [
          ...otherQuestions,
          thisQuestion
        ]
      }
    case END_QUIZ:
      return defaultState;
    default:
      return state;
  }
}

export default quiz;