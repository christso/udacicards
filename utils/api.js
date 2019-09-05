import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'UdaciCards:decks';

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY);
}

export function saveDeck(deck, key) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }));
}

export function removeDeck(deck, key) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results);
      delete data[key];
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    })
}