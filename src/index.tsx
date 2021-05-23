import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import App from './components/application';
import store from './Store';

const container = document.getElementById('contents');
ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    container,
);
