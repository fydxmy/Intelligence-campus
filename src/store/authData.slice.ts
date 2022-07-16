import { RootState } from './index';
import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  tokenData: Partial<{
    phoneNumber: string;
    studentId: string;
    role: Number;
    iat: Number;
    exp: Number;
  }>;
} = {
  tokenData: {},
};

export const authDataSlice = createSlice({
  name: 'TokenDataSlice',
  initialState,
  reducers: {
    setAuthData(
      state: any,
      action: {
        payload: Partial<{
          phoneNumber: string;
          studentId: string;
          role: Number;
          iat: Number;
          exp: Number;
        }>;
        type: string;
      }
    ) {
      console.log(state.tokenData, action.payload);
      state.tokenData = { ...state.tokenData, ...action.payload };
    },
  },
});
export const storeAuthData = (state: RootState) => {
  return state.authDataSlice.tokenData;
};
