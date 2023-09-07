import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    bojHandle: null,
    isAdmin: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.bojHandle = action.payload.bojHandle;
      state.isAdmin = action.payload.isAdmin;
    },
    logout: (state) => {
      state = {
        bojHandle: null,
        isAdmin: false,
      };
    },
  },
});

// actions
export const { setUser, logout } = userSlice.actions;

//reducer
export default userSlice.reducer;
