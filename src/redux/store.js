import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import itemReducer from './item';
import modalReducer from './modal';

const rootReducer = combineReducers({
  user: userReducer,
  item: itemReducer,
  modal: modalReducer,
});

export default configureStore({
  reducer: rootReducer,
});
