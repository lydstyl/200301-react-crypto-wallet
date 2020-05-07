import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { StoreProvider } from 'easy-peasy';
import { store } from './store/store';
import App from './App';

import './index.css';

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);

serviceWorker.register();
