import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link, withRouter } from 'react-router-dom';
import SketchApp from './layouts/SketchApp';
import Homepage from './layouts/Homepage';
import Errorpage from './layouts/Errorpage';
import io from 'socket.io-client'


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
      items: [],
      undo: false
    }
  }

  componentDidMount() {
    // Set up websocket connection
    this.socket = io('http://localhost:3001')

    // Send a new connection message to the websocket server
    this.socket.emit('new connection', this.state.boardName)

    // Show all items of the board on first connection
    this.socket.on('new connection', (data) => {
      console.log('all board data is: ', data);
      if (data.error) {
        this.props.history.push('/error')
      }
      else {
        this.setState({items: data.items})
      }
    })

    this.socket.on('add new items', (data) => {
      const newItems = this.state.items.concat(data.items)
      this.setState({items: newItems})
    })

    this.socket.on('undo an item', (data) => {
      this.setState({undo: true})
      this.setState({items: data.items})
      this.setState({undo: false})
    })



   // this.socket.onmessage = (receivedData) => {
   //    const data = JSON.parse(receivedData.data)
   //    if (data.error) {
   //      this.props.history.push('/error')
   //    }
   //    else if (data.type === 'undo an item' && data.boardName === this.state.boardName) {
   //      this.setState({undo: true})
   //      this.setState({items: data.items})
   //      this.setState({undo: false})
   //    }
   //    else if (data.type === 'add new item'){
   //      if (data.boardName === this.state.boardName) {
   //        this.setState({items: this.state.items.concat(data.items)})
   //      }
   //    }
   //  }
  }

  render() {
    return (
      <div>
        <SketchApp items ={this.state.items}
                   boardName = {this.state.boardName}
                   addNewItem = {this.addNewItem}
                   undoAnItem = {this.undoAnItem}
                   undo = {this.state.undo}/>
      </div>
    )
  }

  addNewItem = (item, boardName) => {
    const data = {
      boardName: boardName,
      items:  item,
    }
    this.socket.emit('add new items', data)

  }

  undoAnItem = (boardName) => {
    this.socket.emit('undo an item', this.state.boardName)
  }

}


const Routes = () => (
  <Router>
    <div className='outer-container'>
     <main id='page-wrap'>
     <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/twoodles/:boardName" component={Twoodle} />
        <Route path="*" component={ErrorComponent}/>
      </Switch>
      </main>
    </div>
  </Router>
)

export default Routes