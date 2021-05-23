import {createSlice} from '@reduxjs/toolkit';

export type State = {
  dirOrFileA: string;
  dirOrFileB: string;
};

const initialState = {
  dirOrFileA: '',
  dirOrFileB: '',
};

// create Slice
const slice = createSlice({
  name: 'compared',
  initialState,
  reducers: {
    selectFileA: (state, action) => {
      return {
        ...state,
        dirOrFileA: action.payload,
      };
    },
    selectFileB: (state, action) => {
      return {
        ...state,
        dirOrFileB: action.payload,
      };
    },
  },
});

// export Reducer
export default slice;

// export Action Creators
export const {selectFileA, selectFileB} = slice.actions;
