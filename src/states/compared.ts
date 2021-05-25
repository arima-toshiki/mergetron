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
      };
    },
    selectFileASuccess: (state, action) => {
      return {
        ...state,
        dirOrFileA: action.payload,
      };
    },
    selectDirAStart: (state, action) => {
      return {
        ...state,
      };
    },
    selectDirAFailure: (state, action) => {
      return {
        ...state,
      };
    },
    selectDirASuccess: (state, action) => {
      return {
        ...state,
        dirOrFileA: action.payload,
      };
    },
    changeFileA: (state, action) => {
      return {
        ...state,
        dirOrFileA: action.payload,
      };
    },
    dropA: (state, action) => {
      const files = action.payload as FileList;
      if (files.length != 1) {
        return {
          ...state,
        };
      }

      return {
        ...state,
        dirOrFileA: files[0]['path'],
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
      };
    },
    selectFileBSuccess: (state, action) => {
      return {
        ...state,
        dirOrFileB: action.payload,
      };
    },
    selectDirBStart: (state, action) => {
      return {
        ...state,
      };
    },
    selectDirBFailure: (state, action) => {
      return {
        ...state,
      };
    },
    selectDirBSuccess: (state, action) => {
      return {
        ...state,
        dirOrFileB: action.payload,
      };
    },
    changeFileB: (state, action) => {
      return {
        ...state,
        dirOrFileB: action.payload,
      };
    },
    dropB: (state, action) => {
      const files = action.payload as FileList;
      if (files.length != 1) {
        return {
          ...state,
        };
      }

      return {
        ...state,
        dirOrFileB: files[0]['path'],
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
  selectDirAStart,
  selectDirAFailure,
  selectDirASuccess,
  changeFileA,
  dropA,
  selectFileBStart,
  selectFileBFailure,
  selectFileBSuccess,
  selectDirBStart,
  selectDirBFailure,
  selectDirBSuccess,
  changeFileB,
  dropB,
} = slice.actions;

export const selectFileA = () => async (dispatch: Dispatch<unknown>): Promise<void> => {
  dispatch(selectFileAStart(null));
  const path = await window.core.openFileDialog();
  if (!path) {
    dispatch(selectFileAFailure('selectFileA failed!'));
  }
  dispatch(selectFileASuccess(path));
};

export const selectDirA = () => async (dispatch: Dispatch<unknown>): Promise<void> => {
  dispatch(selectDirAStart(null));
  const path = await window.core.openDirDialog();
  if (!path) {
    dispatch(selectDirAFailure('selectDirA failed!'));
  }
  dispatch(selectDirASuccess(path));
};

export const selectFileB = () => async (dispatch: Dispatch<unknown>): Promise<void> => {
  dispatch(selectFileBStart(null));
  const path = await window.core.openFileDialog();
  if (!path) {
    dispatch(selectFileBFailure('selectFileA failed!'));
  }
  dispatch(selectFileBSuccess(path));
};

export const selectDirB = () => async (dispatch: Dispatch<unknown>): Promise<void> => {
  dispatch(selectDirBStart(null));
  const path = await window.core.openDirDialog();
  if (!path) {
    dispatch(selectDirBFailure('selectDirB failed!'));
  }
  dispatch(selectDirBSuccess(path));
};
