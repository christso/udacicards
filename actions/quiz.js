export const START_QUIZ = 'START_QUIZ';
export const SET_QUESTION_RESULT = 'SET_QUESTION_RESULT';
export const COMPLETE_QUIZ = 'COMPLETE_QUIZ';

export const startQuiz = (deckId, questions) => ({
  type: START_QUIZ,
  deckId,
  questions
});

export const setQuestionResult = (questionText, result) => ({
  type: SET_QUESTION_RESULT,
  questionText,
  result
});

export const completeQuiz = (deckId) => ({ type: COMPLETE_QUIZ, deckId });