import { createSlice } from '@reduxjs/toolkit';

export const itemSlice = createSlice({
  name: 'item',
  initialState: {
    isBuyItem: false,
    isUseItem: false,
  },
  reducers: {
    setIsBuyItem: (state, action) => {
      state.isBuyItem = action.payload;
    },
    setIsUseItem: (state, action) => {
      state.isUseItem = action.payload;
    },
  },
});

// actions
export const { setIsBuyItem, setIsUseItem } = itemSlice.actions;

//reducer
export default itemSlice.reducer;
