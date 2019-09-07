import { 
  RECEIVE_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD,
  REMOVE_CARD
} from '../actions/decks';

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck
      };
    case REMOVE_DECK:
      const ids = Object.keys(state);
      const newState = Object.assign(state);
      delete newState[action.id];
      return newState;
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