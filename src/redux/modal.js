import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    showStoreModal: false,
    showRecommendModal: false,
  },
  reducers: {
    setShowStoreModal: (state, action) => {
      state.showStoreModal = action.payload;
    },
    setShowRecommendModal: (state, action) => {
      state.showRecommendModal = action.payload;
    },
  },
});

// actions
export const { setShowStoreModal, setShowRecommendModal } = modalSlice.actions;

//reducer
export default modalSlice.reducer;
