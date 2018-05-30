import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './containers/App/App';
import reducers from './redux/reducers/_reducers';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

const boundCompose = compose.bind(null, applyMiddleware(thunk));
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? boundCompose(window.__REDUX_DEVTOOLS_EXTENSION__())
    : boundCompose()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

export default store;
