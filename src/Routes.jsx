import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SketchApp from './layouts/SketchApp';
import Homepage from './layouts/Homepage';
import Sidebar from './Sidebar';
import { push as Menu } from 'react-burger-menu'


const Home = () => (
  <div>
    <Homepage />
  </div>
)

class Twoodle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      boardId: props.match.params.boardId,
      items: []
    }
  }

  componentDidMount() {
    this.setState({items: []})
  }

  render() {
    return (
      <div>
        <h3>Your twoodle code is {this.state.boardId}</h3>
        <SketchApp items ={this.state.items} />
      </div>
    )
  }
}
/*
const Twoodles = ({ match }) => (
  <div>
    <Link to={`${match.url}/${randomStringFunction()}`}><h3>New Twoodle</h3></Link>
    <Route path={`${match.url}/:boardId`} component={Twoodle}/>
  </div>
)
*/
class Twoodles extends React.Component {
  render() {
    return (
      <div>
        {console.log(this.props.match.url)}
        <Link to={`${this.props.location.pathname}`}><h3>New Twoodle</h3></Link>
        <Route path={`${this.props.match.url}/:boardId`} component={Twoodle}/>
      </div>
    )
  }
}

// const Routes = () => (
//   <Router>
//     <div>
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/twoodles">Twoodles</Link></li>
//       </ul>

//       <hr/>

//       <Route exact path="/" component={Home}/>
//       <Route path="/twoodles" component={Twoodles}/>
//     </div>
//   </Router>
// )

// const Routes = () => (
//   <Router>
//     <Menu className="bm-menu"
//     pageWrapId={ "page-wrap" }
//     outerContainerId={ "outer-container" }
//     width={ '20%' } >
//         <a className="bm-item-list"><Link to="/">Home</Link></a>
//         <a className="bm-item-list"><Link to="/twoodles">Twoodles</Link></a>

//         <hr/>

//         <Route exact path="/" component={Home}/>
//         <Route path="/twoodles" component={Twoodles}/>
//     </Menu>
//   </Router>
// )

const Routes = () => (
  <Router>
    <div>
      <Sidebar />
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

