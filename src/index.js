import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import reducer from './reducers'

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <h1>{this.props.currentWord}</h1>
  </Provider>, document.getElementById('root'));
registerServiceWorker();

function mapStateToProps(state) {
  return { currentWord: state.currentWord }
}

export default connect(mapStateToProps)()