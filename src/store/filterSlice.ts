import { createSlice } from '@reduxjs/toolkit';
import { AgeCategoryType, ViedoCategoryType } from '../types/type';
import { RootState } from '.';

type InitialState = {
  ageCategory: AgeCategoryType[];
  videoCategory: ViedoCategoryType[];
};

const initialState: InitialState = {
  ageCategory: [],
  videoCategory: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFliter: (state, actions) => {
      const { ageCategory, videoCategory } = actions.payload;
      return { ...state, ageCategory, videoCategory };
    },
  },
});

export const { setFliter } = filterSlice.actions;
export const selectFliter = (state: RootState): InitialState => state.fliter;

export default filterSlice.reducer;
