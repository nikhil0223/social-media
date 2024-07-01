import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    jwtToken: null,
    profilePage: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.jwtToken = action.payload;
    },
    toggleUser: (state, action) => {
      state.profilePage = action.payload;
    },
  },
});

export const { setToken,toggleUser } = userSlice.actions;

export default userSlice.reducer;
