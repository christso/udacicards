import { 
  RECEIVE_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD,
  REMOVE_CARD
} from '../actions';

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.entries
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      };
    case ADD_CARD:
      const deckId = action.deckId;
      const deck = state[deckId];
      return {
        ...state,
        [deckId]: {
          ...deck,
          questions: [
            ...deck.questions,
            action.card
          ]
        }
      };
    default:
      return state;
  }
}

export default decks;