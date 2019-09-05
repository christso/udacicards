import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <View style={{ marginTop: 20 }}></View>
        <AddDeck />
        {/* <DeckList /> */}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
