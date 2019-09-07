export const START_QUIZ = 'START_QUIZ';
export const SET_QUESTION_RESULT = 'SET_QUESTION_RESULT';
export const END_QUIZ = 'END_QUIZ';

export function startQuiz(deckId, questions) {
  return {
    type: START_QUIZ,
    deckId,
    questions
  };
}

export function setQuestionResult(deckId, questionText, result) {
  return {
    type: SET_QUESTION_RESULT,
    deckId,
    questionText,
    result
  };
}
