import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';

import Toolbar from './Toolbar'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <Toolbar />
  </Provider>, document.getElementById('root'));
registerServiceWorker();

