import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { SIZE, boardType, getTypeLabel } from 'utils/board';

export const boardParamSlice = createSlice({
  name: 'boardParam',
  initialState: {
    params: {
      page: 0,
      size: SIZE,
      condition: {
        type: boardType.FREE.key,
        bojHandle: '',
        query: '',
      },
    },
    title: getTypeLabel(boardType.FREE.key),
  },
  reducers: {
    setBoardParam: (state, action) => {
      state.params = action.payload;
    },
    setBoardTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

// actions
export const { setBoardParam, setBoardTitle } = boardParamSlice.actions;

//reducer
export default boardParamSlice.reducer;
