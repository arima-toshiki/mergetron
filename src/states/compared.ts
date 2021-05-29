import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {CheckPathResult} from '../core/ICore';
import {RootState} from '../rootReducer';

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
  state: RootState;
  rejectValue: Error;
};

export const selectFileA = createAsyncThunk<string, void, AsyncThunkConfig>('selectFileA', async (dummy, thunkAPI) => {
  let result: string;
  try {
    result = await window.core.openFileDialog();
  } catch (e) {
    thunkAPI.rejectWithValue(e);
    return '';
  }
  return result;
});

export const selectDirA = createAsyncThunk<string, void, AsyncThunkConfig>('selectDirA', async (dummy, thunkAPI) => {
  let result: string;
  try {
    result = await window.core.openDirDialog();
  } catch (e) {
    thunkAPI.rejectWithValue(e);
    return '';
  }
  return result;
});

export const selectFileB = createAsyncThunk<string, void, AsyncThunkConfig>('selectFileB', async (dummy, thunkAPI) => {
  let result: string;
  try {
    result = await window.core.openFileDialog();
  } catch (e) {
    thunkAPI.rejectWithValue(e);
    return '';
  }
  return result;
});

export const selectDirB = createAsyncThunk<string, void, AsyncThunkConfig>('selectDirB', async (dummy, thunkAPI) => {
  let result: string;
  try {
    result = await window.core.openDirDialog();
  } catch (e) {
    thunkAPI.rejectWithValue(e);
    return '';
  }
  return result;
});

export const checkPaths = createAsyncThunk<CheckPathResult, void, AsyncThunkConfig>('checkPaths', async (dummy, thunkAPI) => {
  const state = thunkAPI.getState();
  const pathA = state.compared.dirOrFileA;
  const pathB = state.compared.dirOrFileB;
  console.log(`pathA = ${pathA}; pathB = ${pathB}`);
  let result: CheckPathResult;
  try {
    result = await window.core.checkPaths(pathA, pathB);
  } catch (e) {
    thunkAPI.rejectWithValue(e);
    return {canProceed: false, description: ''};
  }
  return result;
});

// create Slice
const slice = createSlice({
  name: 'compared',
  initialState,
  reducers: {
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
    builder.addCase(selectFileA.pending, (state, action) => state);
    builder.addCase(selectFileA.fulfilled, (state, action) => {
      return {
        ...state,
        dirOrFileA: action.payload,
      };
    });
    builder.addCase(selectFileA.rejected, (state, action) => {
      const e = action.payload as Error;
      return {
        ...state,
        canProceed: false,
        description: e.message,
      };
    });

    builder.addCase(selectDirA.pending, (state, action) => state);
    builder.addCase(selectDirA.fulfilled, (state, action) => {
      return {
        ...state,
        dirOrFileA: action.payload,
      };
    });
    builder.addCase(selectDirA.rejected, (state, action) => {
      const e = action.payload as Error;
      return {
        ...state,
        canProceed: false,
        description: e.message,
      };
    });

    builder.addCase(selectFileB.pending, (state, action) => state);
    builder.addCase(selectFileB.fulfilled, (state, action) => {
      return {
        ...state,
        dirOrFileB: action.payload,
      };
    });
    builder.addCase(selectFileB.rejected, (state, action) => {
      const e = action.payload as Error;
      return {
        ...state,
        canProceed: false,
        description: e.message,
      };
    });

    builder.addCase(selectDirB.pending, (state, action) => state);
    builder.addCase(selectDirB.fulfilled, (state, action) => {
      return {
        ...state,
        dirOrFileB: action.payload,
      };
    });
    builder.addCase(selectDirB.rejected, (state, action) => {
      const e = action.payload as Error;
      return {
        ...state,
        canProceed: false,
        description: e.message,
      };
    });

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
export const {changeFileA, dropA, changeFileB, dropB} = slice.actions;
