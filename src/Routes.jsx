import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SketchApp from './layouts/SketchApp';

const Home = () => (
  <div>
    <h1>Insert Home page component from layouts folder</h1>
  </div>
)

const Whiteboard = ({ match }) => (
  <div>
    <h3>{match.params.boardId}</h3>
    <SketchApp />
  </div>
);

const Whiteboards = ({ match }) => (
  <div>
    <h3>Generate new board</h3>
    <Route path={`${match.url}/:boardId`} component={Whiteboard}/>
  </div>
)

const Routes = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/whiteboards">Whiteboards</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/whiteboards" component={Whiteboards}/>
    </div>
  </Router>
)
export default Routes

