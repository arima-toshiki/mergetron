import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AceEditor from 'react-ace';
import {RootState} from '../rootReducer';

import {back} from '../states/compared';

const DiffApplication: React.FC = () => {
  const dispatch = useDispatch();
  const {pathA, encodeA, contentA, loadingA, pathB, encodeB, contentB, loadingB, htmlDiff} = useSelector(
      (state: RootState) => state.diffApplication,
  );

  React.useMemo(() => {
    try {
      require(`ace-builds/src-noconflict/theme-monokai`);
    } catch (e) {
      console.log(e);
    }
  }, []);

  React.useMemo(() => {
    try {
      require(`ace-builds/src-noconflict/mode-javascript`);
    } catch (e) {
      console.log(e);
    }
  }, []);

  React.useMemo(() => {
    try {
      require(`ace-builds/src-noconflict/worker-javascript`);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onClick = () => {
    dispatch(back());
  };

  return (
    <div>
      <span>
        <div style={{visibility: loadingA ? 'visible' : 'hidden'}}>{pathA} loading...</div>
        <div style={{visibility: loadingA ? 'hidden' : 'visible'}}>
          {pathA}({encodeA})<br />
          <AceEditor
            readOnly={true}
            mode="javascript"
            theme="monokai"
            name="CONTENT_A"
            width="100%"
            height="600px"
            value={contentA}
            showPrintMargin={false}
            showGutter={false}
            editorProps={{$blockScrolling: true}}
          />
        </div>
      </span>
      <span>
        <div style={{visibility: loadingB ? 'visible' : 'hidden'}}>{pathB} loading...</div>
        <div style={{visibility: loadingB ? 'hidden' : 'visible'}}>
          {pathB}({encodeB})<br />
          <AceEditor
            readOnly={true}
            mode="javascript"
            theme="monokai"
            name="CONTENT_B"
            width="100%"
            height="600px"
            value={contentB}
            showPrintMargin={false}
            showGutter={false}
            editorProps={{$blockScrolling: true}}
          />
        </div>
      </span>
      <div dangerouslySetInnerHTML={{__html: htmlDiff}} />
      <button onClick={onClick}>戻る</button>
    </div>
  );
};

export default DiffApplication;
