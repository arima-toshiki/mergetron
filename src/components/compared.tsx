import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {RootState} from '../rootReducer';
import {
  selectFileA,
  selectFileB,
  selectDirA,
  selectDirB,
  changeFileA,
  changeFileB,
  dropA,
  dropB,
  checkPaths,
  submit,
} from '../states/compared';
import DirOrFileSelector from './dir_or_file_selector';

const Compared: React.FC = () => {
  const dispatch = useDispatch();
  const {dirOrFileA, dirOrFileB, canProceed, description} = useSelector((state: RootState) => state.compared);

  const onClickFA = useCallback(() => {
    dispatch(selectFileA());
    dispatch(checkPaths());
  }, []);
  const onClickFB = useCallback(() => {
    dispatch(selectFileB());
    dispatch(checkPaths());
  }, []);
  const onClickDA = useCallback(() => {
    dispatch(selectDirA());
    dispatch(checkPaths());
  }, []);
  const onClickDB = useCallback(() => {
    dispatch(selectDirB());
    dispatch(checkPaths());
  }, []);
  const onChangeA = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFileA(e.currentTarget.value));
    dispatch(checkPaths());
  }, []);
  const onChangeB = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFileB(e.currentTarget.value));
    dispatch(checkPaths());
  }, []);
  const onDropA = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(dropA(e.dataTransfer.files));
    dispatch(checkPaths());
  }, []);
  const onDropB = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(dropB(e.dataTransfer.files));
    dispatch(checkPaths());
  }, []);
  const onSubmit = () => {
    dispatch(submit());
  };

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
      <span>{description}</span>
      <button onClick={onSubmit} disabled={!canProceed}>
        比較
      </button>
    </div>
  );
};

export default Compared;
