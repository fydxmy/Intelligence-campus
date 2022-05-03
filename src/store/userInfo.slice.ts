import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';
interface initialStateType {
  userInfo: Partial<{
    age: number;
    avatar: string;
    gender: number;
    id: number;
    nickName: string;
    selfIntroduction: string;
    studentId: string;
  }>;
}
const initialState: initialStateType = {
  userInfo: {},
};

export const userInfoSlice = createSlice({
  name: 'userInfoSlice',
  initialState,
  reducers: {
    setUserInfo(
      state,
      action: {
        payload: initialStateType['userInfo'];
        type: string;
      }
    ) {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
  },
});

export const storeUserInfo = (state: RootState) => {
  return state.storeUserInfo.userInfo;
};
