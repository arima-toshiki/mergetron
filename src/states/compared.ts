import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Dispatch} from 'react';

import {CheckPathResult} from '../core/ICore';

export type State = {
  dirOrFileA: string;
  dirOrFileB: string;
  canProceed: boolean;
  description: string;
};

const initialState: State = {
  dirOrFileA: '',
  dirOrFileB: '',
  canProceed: false,
  description: '',
};

type AsyncThunkConfig = {
  state: State;
  rejectValue: Error;
};

export const checkPaths = createAsyncThunk<CheckPathResult, void, AsyncThunkConfig>('checkPaths', async (paths, thunkAPI) => {
  const state = thunkAPI.getState() as any;
  const pathA = state.compared.dirOrFileA;
  const pathB = state.compared.dirOrFileB;
  console.log(`pathA = ${pathA}; pathB = ${pathB}`);
  let result: CheckPathResult;
  try {
    result = await window.core.checkPaths(pathA, pathB);
  } catch (e) {
    thunkAPI.rejectWithValue(e);
    return;
  }
  return result;
});

// create Slice
const slice = createSlice({
  name: 'compared',
  initialState,
  reducers: {
    selectFileAStart: (state, action) => state,
    selectFileAFailure: (state, action) => state,
    selectFileASuccess: (state, action) => {
      return {
        ...state,
        dirOrFileA: action.payload,
        dirOrFileB: state.dirOrFileB,
      };
    },
    selectDirAStart: (state, action) => state,
    selectDirAFailure: (state, action) => state,
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
    selectFileBStart: (state, action) => state,
    selectFileBFailure: (state, action) => state,
    selectFileBSuccess: (state, action) => {
      return {
        ...state,
        dirOrFileB: action.payload,
        ...window.core.checkPaths(state.dirOrFileA, action.payload),
      };
    },
    selectDirBStart: (state, action) => state,
    selectDirBFailure: (state, action) => state,
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
  extraReducers: (builder) => {
    builder.addCase(checkPaths.pending, (state, action) => state);
    builder.addCase(checkPaths.fulfilled, (state, action) => {
      const {canProceed, description} = action.payload as CheckPathResult;
      return {
        ...state,
        canProceed,
        description,
      };
    });
    builder.addCase(checkPaths.rejected, (state, action) => {
      const e = action.payload as Error;
      return {
        ...state,
        canProceed: false,
        description: e.message,
      };
    });
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
