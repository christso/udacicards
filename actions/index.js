export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_CARD = 'ADD_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';

export function receiveEntries(entries) {
  return {
    type: RECEIVE_DECKS,
    entries
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function removeDeck(name) {
  return {
    type: REMOVE_DECK,
    name
  }
}

/*
deckId = 'React',
card = {
  question: 'What is React?',
  answer: 'A library for managing user interfaces'
}
*/
export function addCard(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card
  }
}

export function removeCard(name) {
  return {
    type: REMOVE_CARD,
    name
  }
}