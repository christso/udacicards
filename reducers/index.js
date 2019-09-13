import { combineReducers } from 'redux';
import decks from './decks';
import quiz from './quiz';
import quizReminder from './quizReminder';

export default combineReducers({ decks, quiz, quizReminder });