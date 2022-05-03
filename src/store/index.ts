import { configureStore } from '@reduxjs/toolkit';
import { authTokenSlice } from './authToken.slice';
import { userInfoSlice } from './userInfo.slice';
export const rootReducer = {
  authToken: authTokenSlice.reducer,
  storeUserInfo: userInfoSlice.reducer,
};
export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
