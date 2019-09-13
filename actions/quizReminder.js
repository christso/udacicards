export const SET_QUIZ_REMINDER = 'SET_QUIZ_REMINDER';
export  const RECEIVE_REMINDER = 'RECEIVE_REMINDER';

export function setQuizReminder(hour, minute) {
  return {
    type: SET_QUIZ_REMINDER,
    hour,
    minute
  }
}
