import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'UdaciCards:decks';

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY);
}

export function saveDeck(deck, id) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [id]: deck
  }));
}

export function removeDeck(id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results);
      delete data[id];
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    })
}

export function addCard(card, deckId) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => {
      const decks = JSON.parse(results);
      const deck = decks[deckId];
      deck.questions.concat([card]);
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    });
}