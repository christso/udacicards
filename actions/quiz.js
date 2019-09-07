export const START_QUIZ = 'START_QUIZ';

export function startQuiz(deckId, questions) {
  return {
    type: START_QUIZ,
    deckId,
    questions
  };
}

/* Example data
quiz: {
  deckId,
  questions: [{
    question,
    answer,
    flipped: [true, false]
    result: [correct, incorrect]
  }]
}
If result !== null, then it will remain in the quiz.
If all results are not null (or last element in array), then quiz has ended.
*/