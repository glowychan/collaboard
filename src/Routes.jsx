import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link, withRouter } from 'react-router-dom';
import SketchApp from './layouts/SketchApp';
import Homepage from './layouts/Homepage';
import Errorpage from './layouts/Errorpage';

const Home = () => (
  <div>
    <Homepage />
  </div>
)

const ErrorComponent = () => (
  <div>
    <Errorpage />
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
    this.socket = new WebSocket("ws://localhost:3001" + window.location.pathname)

    this.socket.onopen = () => {
      const message = {
        type: 'newConnection',
        boardName: this.state.boardName
      }
      this.socket.send(JSON.stringify(message))
    }

   this.socket.onmessage = (receivedData) => {
      const data = JSON.parse(receivedData.data)
      if (data.error) {
        alert(data.error)
        //window.location = '/';
        this.props.history.push('/error')
      } else if (data.type === 'undo' && data.boardName === this.state.boardName) {

        let array = this.state.items;
        let index = array.pop();


        this.setState({items: array});

      }

      else {
        if (data.boardName === this.state.boardName) {
          // this.setState({items: [...this.state.items, data.items]})
          this.setState({items: this.state.items.concat(data.items)})
        }
      }
    }
  }

  render() {
    return (
      <div>
        <SketchApp items ={this.state.items}
                   boardName = {this.state.boardName}
                   addNewItem = {this.addNewItem}/>
      </div>
    )
  }

  addNewItem = (item, boardName) => {
    const data = {
      boardName: boardName,
      items:  item
    }
    this.socket.send(JSON.stringify(data))
  }
}

// class Twoodles extends React.Component {

//   //REDIRECT TWOODLES PAGE TO MAIN PAGE
//   render() {
//     return (
//       <div>
//         <Link to={`${this.props.location.pathname}`}><h3>New Twoodle</h3></Link>
//         <Route path={`${this.props.match.url}/:boardName`} component={Twoodle}/>
//       </div>
//     )
//   }
// }

const Twoodles = ({ location, match }) => (
  <div>
    <Link to={`${location.pathname}`}><h3>New Twoodle</h3></Link>
    <Switch>
      <Route path={`${match.url}/:boardName`} component={Twoodle}/>
      <Route exact path="/twoodles" Redirect to="/" />
    </Switch>
  </div>
)

// const Routes = () => (
//   <Router>
//     <div className='outer-container'>
//      <main id='page-wrap'>
//       <Route exact path="/" component={Home}/>
//       <Route path="/twoodles" component={Twoodles}/>
//       <Route path="*" component={Error}/>
//       </main>
//     </div>
//   </Router>

  const Routes = () => (
  <Router>
    <div className='outer-container'>
     <main id='page-wrap'>
     <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/twoodles" component={Twoodles}/>
        <Route path="*" component={ErrorComponent}/>
      </Switch>
      </main>
    </div>
  </Router>
)

export default Routes