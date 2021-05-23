import {combineReducers} from '@reduxjs/toolkit';

import slice from './states/compared';

const reducer = combineReducers({
  compared: slice.reducer,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
