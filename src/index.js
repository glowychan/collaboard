import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SketchApp from './layouts/SketchApp';
import Routes from './Routes';
import Sidebar from './Sidebar';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
