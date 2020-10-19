import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Widget from './components/Widget';
import * as serviceWorker from './serviceWorker';
import { combineReducers, createStore } from 'redux';
import { WidgetState } from './store/state';
import { Provider } from 'react-redux';
import { donationReducer } from './store/donation/reducer';
import { layoutReducer } from './store/layout/reducer';
import { errorReducer } from './store/error/reducer';
import { payPalReducer } from './store/paypal/reducer';

/**
 * Here we create our top level redux store
 * This store is responsible for all of the shared UI state
 */
const rootReducer = combineReducers<WidgetState>({
  donation: donationReducer,
  layout: layoutReducer,
  paypal: payPalReducer,
  error: errorReducer,
});

/**
 * We use the redux devtools extension for Chrome
 * This requires us to add some properties from the window to the store
 * We've disabled some linting because typescript doesn't know about
 * these properties
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;
// eslint-disable-next-line no-underscore-dangle
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Widget/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
