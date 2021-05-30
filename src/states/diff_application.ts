import {createSlice} from '@reduxjs/toolkit';

export type DiffApplicationState = {
  dummy: string;
};

const initialState: DiffApplicationState = {
  dummy: 'dummy',
};

const slice = createSlice({
  name: 'diffApplication',
  initialState,
  reducers: {},
});

export default slice;
