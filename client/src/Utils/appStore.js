import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Redux/userSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default appStore;
