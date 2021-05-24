import {createSlice} from '@reduxjs/toolkit';
import {Dispatch} from 'react';

import '../core/ICore';

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
    selectFileAStart: (state, action) => {
      return {
        ...state,
      };
    },
    selectFileAFailure: (state, action) => {
      return {
        ...state,
        dirOrFileA: '',
      };
    },
    selectFileASuccess: (state, action) => {
      return {
        ...state,
        dirOrFileA: action.payload,
      };
    },
    selectFileBStart: (state, action) => {
      return {
        ...state,
      };
    },
    selectFileBFailure: (state, action) => {
      return {
        ...state,
        dirOrFileB: '',
      };
    },
    selectFileBSuccess: (state, action) => {
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
export const {
  selectFileAStart,
  selectFileAFailure,
  selectFileASuccess,
  selectFileBStart,
  selectFileBFailure,
  selectFileBSuccess,
} = slice.actions;

export const selectFileA = () => async (dispatch: Dispatch<unknown>): Promise<void> => {
  dispatch(selectFileAStart(null));
  const path = await window.core.openFileDialog();
  if (!path) {
    dispatch(selectFileAFailure('selectFileA failed!'));
  }
  dispatch(selectFileASuccess(path));
};

export const selectFileB = () => async (dispatch: Dispatch<unknown>): Promise<void> => {
  dispatch(selectFileBStart(null));
  const path = await window.core.openFileDialog();
  if (!path) {
    dispatch(selectFileBFailure('selectFileA failed!'));
  }
  dispatch(selectFileBSuccess(path));
};
