import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {RootState} from '../rootReducer';
import {selectFileA, selectFileB, changeFileA, changeFileB} from '../states/compared';
import DirOrFileSelector from './dir_or_file_selector';

const Compared: React.FC = () => {
  const dispatch = useDispatch();
  const {dirOrFileA, dirOrFileB} = useSelector((state: RootState) => state.compared);

  const onClickA = useCallback(() => {
    dispatch(selectFileA());
  }, []);
  const onClickB = useCallback(() => {
    dispatch(selectFileB());
  }, []);
  const onChangeA = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFileA(e.currentTarget.value));
  }, []);
  const onChangeB = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFileB(e.currentTarget.value));
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onSubmit = () => {};

  return (
    <div className="inner">
      <DirOrFileSelector name="第１のファイル又はディレクトリ" value={dirOrFileA} onClick={onClickA} onChange={onChangeA} />
      <DirOrFileSelector name="第２のファイル又はディレクトリ" value={dirOrFileB} onClick={onClickB} onChange={onChangeB} />
      <button onClick={onSubmit}>比較</button>
    </div>
  );
};

export default Compared;
