import { RootState } from './index';
import { createSlice } from '@reduxjs/toolkit';
import { StudyStatusType } from '../screen/My/screen/StudyStatus/data';

const initialState: { studentStatus: Partial<StudyStatusType> } = {
  studentStatus: {},
};
export const studentStatusSlice = createSlice({
  name: 'studentStatusSlice',
  initialState,
  reducers: {
    setStudentStatus(state, action) {
      state.studentStatus = action.payload;
    },
  },
});

export const storeStudentStatus = (state: RootState) => {
  return state.studentStatusSlice.studentStatus;
};
