import { configureStore } from '@reduxjs/toolkit';
import { authDataSlice } from './authData.slice';
import { authTokenSlice } from './authToken.slice';
import { studentStatusSlice } from './studentStatus.slice';
import { userInfoSlice } from './userInfo.slice';
export const rootReducer = {
  authToken: authTokenSlice.reducer,
  storeUserInfo: userInfoSlice.reducer,
  studentStatusSlice: studentStatusSlice.reducer,
  authDataSlice: authDataSlice.reducer,
};
export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
