import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './mainSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});
