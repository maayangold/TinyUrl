import { createStore, combineReducers } from 'redux';
import someReducer from './reducers/someReducer';

const rootReducer = combineReducers({
  someReducer,
  // Add more reducers as needed
});

const store = createStore(rootReducer);

export default store;
