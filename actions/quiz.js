export const START_QUIZ = 'START_QUIZ';
export const SET_QUESTION_RESULT = 'SET_QUESTION_RESULT';
export const COMPLETE_QUIZ = 'COMPLETE_QUIZ';

export function startQuiz(deckId, questions) {
  return {
    type: START_QUIZ,
    deckId,
    questions
  };
}

export function setQuestionResult(questionText, result) {
  return {
    type: SET_QUESTION_RESULT,
    questionText,
    result
  };
}

export function completeQuiz(deckId) {
  return {
    type: COMPLETE_QUIZ,
    deckId
  }
}