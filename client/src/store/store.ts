import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './Auth/LoginSlice';
import signupReducer from './Auth/SignupSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;