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
      undo: false,
      clear: false,
      onlineUsers: [],
      tempTextItem: '',
      location:'',

      textBoxStyle: {
        top: '0px',
        left: '0px',
        width: '100px',
        height: '100px',
        display: 'none',
        position: 'absolute',
        border: '1px solid red',
        background: 'none',
        zIndex: 500
      }


    }
    this.onResize = this.onResize.bind(this)
  }


 onResize() {
  alert('resize')
  const items = this.state.items
  this.setState({
    items: []
  })

  this.setState({
    items: items
  })
}

  componentDidMount() {

    // Set up websocket connection
    this.socket = io('http://localhost:3001')

    // Send a new connection message to the websocket server
    this.socket.emit('new connection', this.state.boardName)
    this.socket.emit('online users', this.state.boardName)

    // Receive all items of a board on first connection
    this.socket.on('new connection', (data) => {
      if (data.error) {
        this.props.history.push('/error')
      }
      else {
        this.setState({items: data.items})
      }
    })

    // Recieve new items and add them to state
    this.socket.on('add new items', (data) => {
      const newItems = this.state.items.concat(data.items)
      this.setState({items: newItems})
    })

    // Receive all items of a board after an item is removed (after undo request)
    this.socket.on('undo an item', (data) => {
      this.setState({undo: true})
      this.setState({items: data.items})
      this.setState({undo: false})
    })


    // Clear canvas for all users when clear function has been clicked
    this.socket.on('delete all items', () => {
      this.setState({clear: true})
    })

    // Recives online users when users join/leave
    this.socket.on('online users', (onlineUsers) => {
      this.setState({onlineUsers: onlineUsers})
    })

    // Redirect all users when a board has been deleted
    this.socket.on('delete a board', () => {
      window.location = `/`
    })
  }

  render() {
    return (
      <div>
        <SketchApp items ={this.state.items}
                   boardName = {this.state.boardName}
                   addNewItem = {this.addNewItem}
                   undoAnItem = {this.undoAnItem}
                   undo = {this.state.undo}
                   clear = {this.state.clear}
                   deleteAllItems = {this.deleteAllItems}
                   newUserName = {this.newUserName}
                   users = {this.state.onlineUsers}
                   deleteBoard = {this.deleteBoard}
                   onTextChange = {this.onTextChange}
                   sendText={this.sendText}
                   textBoxStyle={this.state.textBoxStyle}
                   changeTextBoxStyle={this.changeTextBoxStyle}
                   />
      </div>
    )
  }

  // Send new items through the websockets to be braodcasted
  addNewItem = (item, boardName) => {
    const data = {
      boardName: boardName,
      items:  item,
    }
    this.socket.emit('add new items', data)
  }

  // Send an undo request through websockets
  undoAnItem = (boardName) => {
    this.socket.emit('undo an item', this.state.boardName)
  }

  deleteAllItems = (boardName) => {
    this.socket.emit('delete all items', this.state.boardName)
  }

  // Send user's name upon change
  newUserName = (userName) => {
    this.socket.emit('new user name', userName)
    this.socket.emit('online users', this.state.boardName)
  }

  // Send a delete board request through websockets
  deleteBoard = (boardName) => {
    this.socket.emit('delete a board', this.state.boardName)
  }

  onTextChange = (event) => {
    console.log(event.target.value)
    const item = {
      id: '123',
      text: event.target.value,
      tool: 'textbox',

    }
    this.setState({text: event.target.value})
  }

  sendText = () => {
    console.log('I want to send the text', this.state.text)
    //instead of sending it just add to the state
    const item = {
      id: 'test',
      text: this.state.text,
      tool: 'textbox',
      start: this.state.location
    }
    this.socket.emit('add new items', {items: item, boardName: this.state.boardName})
  }

  changeTextBoxStyle = (style, location) => {
    console.log('I am here')
    this.setState({location: location})
    this.setState({textBoxStyle: style})
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