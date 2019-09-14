export const SET_QUIZ_REMINDER = 'SET_QUIZ_REMINDER';
export  const RECEIVE_REMINDER = 'RECEIVE_REMINDER';

export const setQuizReminder = (hour, minute) => ({
  type: SET_QUIZ_REMINDER,
  hour,
  minute
});