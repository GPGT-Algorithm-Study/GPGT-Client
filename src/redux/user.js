import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    bojHandle: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.bojHandle = action.payload.bojHandle;
    },
    logout: (state) => {
      state = {
        bojHandle: null,
      };
    },
  },
});

// actions
export const { setUser, logout } = userSlice.actions;

//reducer
export default userSlice.reducer;
