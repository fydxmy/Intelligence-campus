import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';
import { ASuserInfoMap, storeData } from '../asyncStorage';
import { asyncDispatch } from '../types/asyncDispatch';
import { userInfoType } from '../types/requsetDataType';
import { useFetchHttp } from '../utils';
import { USERINFO_URI } from '../utils/pathMap';

interface initialStateType {
  useInfoData: Partial<userInfoType>;
}
const initialState: initialStateType = {
  useInfoData: {},
};

export const userInfoSlice = createSlice({
  name: 'userInfoSlice',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.useInfoData = { ...state.useInfoData, ...action.payload };
    },
  },
});

export const storeUserInfo = (state: RootState) => {
  return state.userInfo;
};

export const userInfoActions = userInfoSlice.actions;

export const useSetUserInfo = () => {
  const client = useFetchHttp();
  const dispatch: asyncDispatch<userInfoType> = useDispatch();
  return () => {
    client(USERINFO_URI, { reqMethod: 'POST' }).then((data: userInfoType) => {
      if (data) {
        dispatch(userInfoActions.setUserInfo(data));
        storeData(ASuserInfoMap.keyName, data);
      }
    });
  };
};
