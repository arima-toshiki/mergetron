import {combineReducers} from '@reduxjs/toolkit';

import comparedSlice from './states/compared';
import diffApplicationSlice from './states/diff_application';

const reducer = combineReducers({
  compared: comparedSlice.reducer,
  diffApplication: diffApplicationSlice.reducer,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
