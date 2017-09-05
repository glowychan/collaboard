import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SketchApp from './layouts/SketchApp';
import Homepage from './layouts/Homepage';

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
    <Homepage />
  </div>
)


class Twoodle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      boardName: props.match.params.boardName,
      items: []
    }
  }
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001")
    this.socket.onmessage = (receivedData) => {
      const data = JSON.parse(receivedData.data)

      if (data.boardName === this.state.boardName) {
        console.log(this.state.items)
        this.setState({items: [...this.state.items, data.item]})
      }
    }
  }
  render() {
    return (
      <div>
        <h3>Your twoodle bord name is: {this.state.boardName}</h3>
        <SketchApp items ={this.state.items}
                   boardName = {this.state.boardName}
                   addNewItem = {this.addNewItem}/>
      </div>
    )
  }

  addNewItem = (item, boardName) => {
    const data = {
      boardName: boardName,
      item:  item
    }
    this.socket.send(JSON.stringify(data))
  }
}

class Twoodles extends React.Component {


  //REDIRECT TWOODLES PAGE TO MAIN PAGE
  render() {
    return (
      <div>
        {console.log(this.props.match.url)}
        <Link to={`${this.props.location.pathname}`}><h3>New Twoodle</h3></Link>
        <Route path={`${this.props.match.url}/:boardName`} component={Twoodle}/>
      </div>
    )
  }
}

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

