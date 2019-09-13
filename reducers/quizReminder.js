import { SET_QUIZ_REMINDER } from '../actions/quizReminder';

export default function quizReminder(state = { hour: 20, minute: 0 }, action) {
  switch (action.type) {
    case SET_QUIZ_REMINDER:
      return {
        hour: action.hour,
        minute: action.minute
      }
    default:
      return state; 
  }
}