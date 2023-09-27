import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import itemReducer from './item';
import modalReducer from './modal';
import boardParamReducer from './boardParam';

const rootReducer = combineReducers({
  user: userReducer,
  item: itemReducer,
  modal: modalReducer,
  boardParam: boardParamReducer,
});

export default configureStore({
  reducer: rootReducer,
});
