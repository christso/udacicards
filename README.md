# Mobile Flashcards Project (UdaciCards)

This is a mobile application for Android and iOS that allows users to study collections of flashcards. This app allows users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.

This app has been tested with Android and iOS. However, for iOS does not allow notifications to repeat daily, so if you forget to complete to the quiz, you will only be reminded once.

## Instructions

To run the project:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Project Structure
```bash
├── README.md # This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── actions # Redux actions to be dispatched
│   ├── decks.js # Actions for updating the decks.
│   └── quiz.js # Actions for starting, answering and completing the quiz.
├── components # React shared components
│   ├── CenteredText.js # This is a text component that places the text at the center of the screen.
│   ├── HorizontalRule.js # This displays a horizontal line across the page, similar to <hr>
│   ├── SubmitBtn.js # Button with custom style.
│   ├── TextInputBox.js # Text input component with custom style.
│   └── View.js # View with custom style.
├── containers # React components which are connected to the store.
│   ├── AddCard.js # Form for adding a new card to the deck.
│   ├── AddDeck.js # Form for adding a new deck.
│   ├── Deck.js # Displays a deck as part of the deck list.
│   ├── DeckDetail.js # Deck screen which shows information and actions relating to the deck.
│   ├── DeckList.js # Displays a list of decks.
│   └── Quiz.js # Displays the quiz, where a question is selected, and the user can show the answer, mark as correct or incorrect, and view results after completing the quiz.
├── middleware # Redux middleware
│   └── index.js # Logs state changes to the console
├── reducers # Redux reducers for updating the store
│   ├── decks.js # Reducers for decks.
│   ├── quiz.js # Reducer for the quiz.
│   └── index.js # commbines reducers into a single reducer
├── utils
│   ├── api.js # API for interacting with AsyncStorage.
│   ├── colors.js # Predefined colors.
│   └── helpers.js # Helper functions.
├── App.js # This is the root of the app.
├── styles.js # Global styles.
└── store.js # Configures the redux store.
```