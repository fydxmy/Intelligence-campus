import { RootState } from './index';
import { createSlice } from '@reduxjs/toolkit';

const initialState: { token: string } = {
  token: '',
};
export const authTokenSlice = createSlice({
  name: 'authTokenSlice',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const storeToken = (state: RootState) => {
  return state.authToken.token;
};
