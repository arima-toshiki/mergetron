import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../rootReducer';

import {back} from '../states/compared';

const DiffApplication: React.FC = () => {
  const dispatch = useDispatch();
  const {pathA, encodeA, contentA, loadingA, pathB, encodeB, contentB, loadingB} = useSelector(
      (state: RootState) => state.diffApplication,
  );

  const onClick = () => {
    dispatch(back());
  };

  return (
    <div>
      <span>
        <div style={{visibility: loadingA ? 'visible' : 'hidden'}}>{pathA} loading...</div>
        <div style={{visibility: loadingA ? 'hidden' : 'visible'}}>
          {pathA}({encodeA})<br />
          {contentA}
        </div>
      </span>
      <span>
        <div style={{visibility: loadingB ? 'visible' : 'hidden'}}>{pathB} loading...</div>
        <div style={{visibility: loadingB ? 'hidden' : 'visible'}}>
          {pathB}({encodeB})<br />
          {contentB}
        </div>
      </span>
      <button onClick={onClick}>戻る</button>
    </div>
  );
};

export default DiffApplication;
