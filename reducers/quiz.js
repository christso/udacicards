import { START_QUIZ, SET_QUESTION_RESULT, COMPLETE_QUIZ } from '../actions/quiz';
import { formatDate } from '../utils/helpers';

const defaultState = { deckId: null, completions: 0, lastCompletionDate: null };

function quiz(state = defaultState, action) {
  switch (action.type) {
    case START_QUIZ:
      return {
        ...defaultState,
        completions: state.completions,
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
    case COMPLETE_QUIZ:
      let completions = state.completions;
      const { lastCompletionDate } = state;

      // reset completions if it is a new day
      if (lastCompletionDate 
        && formatDate(lastCompletionDate) < formatDate(new Date())) {
          completions = 0;
          console.log('completions reset');
      }

      return {
        ...state,
        completions: completions + 1,
        lastCompletionDate: new Date()
      }
    default:
      return state;
  }
}

export default quiz;