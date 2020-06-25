import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-app-polyfill/ie11';

import App from './App';
import configureStore from './store/store'
import * as serviceWorker from './serviceWorker';

import './index.scss';

// initialize store with default state
const store = configureStore({
  city: {
    loading: false,
    cities: [],
    expiry: 0
  },
  restaurant: {}
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <header className="header">Open Table</header>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
