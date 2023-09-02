import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import itemReducer from './item';

const rootReducer = combineReducers({
  user: userReducer,
  item: itemReducer,
});

export default configureStore({
  reducer: rootReducer,
});
