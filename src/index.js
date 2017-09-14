import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
// import '../node_modules/sweetalert/dist/sweetalert.css'



ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
