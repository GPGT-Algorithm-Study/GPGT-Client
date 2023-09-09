import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    showStoreModal: false,
    showRecommendModal: false,
    showWarningManageModal: false,
    showUserManageModal: false,
  },
  reducers: {
    setShowStoreModal: (state, action) => {
      state.showStoreModal = action.payload;
    },
    setShowRecommendModal: (state, action) => {
      state.showRecommendModal = action.payload;
    },
    setShowWarningManageModal: (state, action) => {
      state.showWarningManageModal = action.payload;
    },
    setShowUserManageModal: (state, action) => {
      state.showUserManageModal = action.payload;
    },
  },
});

// actions
export const {
  setShowStoreModal,
  setShowRecommendModal,
  setShowWarningManageModal,
  setShowUserManageModal,
} = modalSlice.actions;

//reducer
export default modalSlice.reducer;
