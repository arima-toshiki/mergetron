import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {RootState} from '../rootReducer';
import {selectFileA, selectFileB} from '../states/compared';
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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onSubmit = () => {};

  return (
    <div className="inner">
      <DirOrFileSelector name="第１のファイル又はディレクトリ" value={dirOrFileA} onClick={onClickA} />
      <DirOrFileSelector name="第２のファイル又はディレクトリ" value={dirOrFileB} onClick={onClickB} />
      <button onClick={onSubmit}>比較</button>
    </div>
  );
};

export default Compared;
