import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'UdaciCards:decks';

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => JSON.parse(results));
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

export function addCard(deckId, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => {
      const decks = JSON.parse(results);
      decks[deckId].questions = decks[deckId].questions.concat([card]);
      console.log('db.decks---> ', JSON.stringify(decks));
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    });
}