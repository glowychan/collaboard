import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SketchApp from './layouts/SketchApp';

const randomStringFunction = function() {
  let id = "";
  const source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 6; i++) {
    id += source.charAt(Math.floor(Math.random() * source.length));
  }
  return id;
};

const Home = () => (
  <div>
    <h1>Insert Home page component from layouts folder</h1>
  </div>
)

const Twoodle = ({ match }) => (
  <div>
    <h3>{match.params.boardId}</h3>
    <SketchApp />
  </div>
);

const Twoodles = ({ match }) => (
  <div>
    <h3>Create a New Twoodle</h3>
    <a href={`${match.url}/${randomStringFunction()}`}>Link!!</a>
    <Route path={`${match.url}/:boardId`} component={Twoodle}/>
  </div>
)

const Routes = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/twoodles">Twoodles</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/twoodles" component={Twoodles}/>
    </div>
  </Router>
)
export default Routes

