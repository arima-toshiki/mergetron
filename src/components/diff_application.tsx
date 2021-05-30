import React from 'react';
import {useDispatch} from 'react-redux';

import {back} from '../states/compared';

const DiffApplication: React.FC = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(back());
  };

  return (
    <div>
      でぃふあぷりけーしょん
      <button onClick={onClick}>戻る</button>
    </div>
  );
};

export default DiffApplication;
