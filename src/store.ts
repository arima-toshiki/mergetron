import {combineReducers, createStore} from 'redux';
import {IState} from './states/IState';
import userReducer from './reducers/UserReducer';

// 複数の reducer を束ねる
const combinedReducer = combineReducers<IState>({
  user: userReducer,
  // reducer が増えたら足していく
});

// グローバルオブジェクトとして、store を作成する。
export const store = createStore(combinedReducer);

// import store from './Store' とアクセスできるように default として定義する
export default store;
