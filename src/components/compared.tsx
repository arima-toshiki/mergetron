import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {RootState} from '../rootReducer';
import {selectFileA, selectFileB, selectDirA, selectDirB, changeFileA, changeFileB, dropA, dropB} from '../states/compared';
import DirOrFileSelector from './dir_or_file_selector';

const Compared: React.FC = () => {
  const dispatch = useDispatch();
  const {dirOrFileA, dirOrFileB} = useSelector((state: RootState) => state.compared);

  const onClickFA = useCallback(() => {
    dispatch(selectFileA());
  }, []);
  const onClickFB = useCallback(() => {
    dispatch(selectFileB());
  }, []);
  const onClickDA = useCallback(() => {
    dispatch(selectDirA());
  }, []);
  const onClickDB = useCallback(() => {
    dispatch(selectDirB());
  }, []);
  const onChangeA = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFileA(e.currentTarget.value));
  }, []);
  const onChangeB = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFileB(e.currentTarget.value));
  }, []);
  const onDropA = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(dropA(e.dataTransfer.files));
  }, []);
  const onDropB = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(dropB(e.dataTransfer.files));
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onSubmit = () => {};

  return (
    <div className="inner">
      <DirOrFileSelector
        name="第１のファイル又はディレクトリ"
        value={dirOrFileA}
        onClickF={onClickFA}
        onClickD={onClickDA}
        onChange={onChangeA}
        onDrop={onDropA}
      />
      <DirOrFileSelector
        name="第２のファイル又はディレクトリ"
        value={dirOrFileB}
        onClickF={onClickFB}
        onClickD={onClickDB}
        onChange={onChangeB}
        onDrop={onDropB}
      />
      <button onClick={onSubmit}>比較</button>
    </div>
  );
};

export default Compared;
