import {createAsyncThunk, createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';

import '../core/ICore';
import {LoadFileResult} from '../core/ICore';
import {RootState} from '../rootReducer';

export type DiffApplicationState = {
  pathA: string;
  encodeA: Encoding.Encoding;
  contentA: string;
  loadingA: boolean;
  pathB: string;
  encodeB: Encoding.Encoding;
  contentB: string;
  loadingB: boolean;
  errorMessage: string;
};

const initialState: DiffApplicationState = {
  pathA: '',
  encodeA: 'BINARY',
  contentA: '',
  loadingA: false,
  pathB: '',
  encodeB: 'BINARY',
  contentB: '',
  loadingB: false,
  errorMessage: '',
};

export type AsyncThunkConfig = {
  state: RootState;
  rejectValue: Error;
  dispatch: Dispatch<any>;
};

export const loadFiles = createAsyncThunk<{fileInfoA: LoadFileResult; fileInfoB: LoadFileResult}, void, AsyncThunkConfig>(
    'loadFiles',
    async (arg, thunkAPI) => {
      const state = thunkAPI.getState().diffApplication;
      const fileInfoA = await window.core.loadFile(state.pathA);
      const fileInfoB = await window.core.loadFile(state.pathB);
      return {fileInfoA, fileInfoB};
    },
);

// create slice
const slice = createSlice({
  name: 'diffApplication',
  initialState,
  reducers: {
    initialize: (state: DiffApplicationState, action: PayloadAction<{pathA: string; pathB: string}>) => {
      state.pathA = action.payload.pathA;
      state.pathB = action.payload.pathB;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFiles.pending, (state, action) => {
      state.loadingA = state.loadingB = true;
    });
    builder.addCase(loadFiles.fulfilled, (state, action) => {
      state.loadingA = state.loadingB = false;
      state.encodeA = action.payload.fileInfoA.encode;
      state.contentA = action.payload.fileInfoA.content;
      state.encodeB = action.payload.fileInfoB.encode;
      state.contentB = action.payload.fileInfoB.content;
    });
    builder.addCase(loadFiles.rejected, (state, action) => {
      state.loadingA = state.loadingB = false;
      const e: Error = action.payload as Error;
      state.errorMessage = e.message;
    });
  },
});

export default slice;

export const {initialize} = slice.actions;
