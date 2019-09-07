import { START_QUIZ } from '../actions/quiz';

function quiz(state = {}, action) {
  switch (action.type) {
    case START_QUIZ:
      return action.quiz;
    default:
      return state;
  }
}

export default quiz;