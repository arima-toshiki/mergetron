import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../rootReducer';

import Compared from './compared';
import DiffApplication from './diff_application';

const Application: React.FC = () => {
  const {submitted} = useSelector((state: RootState) => state.compared);
  return <div>{submitted ? <DiffApplication /> : <Compared />}</div>;
};

export default Application;
