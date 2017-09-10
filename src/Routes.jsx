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
    // this.socket = new WebSocket("ws://localhost:3001" + window.location.pathname)

    this.socket = io('http://localhost:3001')

    this.socket.emit('new connection', this.state.boardName)

    this.socket.on('new connection', function (data) {
      console.log('all board data is: ', data);
    })

    this.socket.on('add new item', function (item) {
      console.log('new item is: ', item);
    })

   //  this.socket.onopen = () => {
   //    const message = {
   //      type: 'newConnection',
   //      boardName: this.state.boardName
   //    }
   //    this.socket.send(JSON.stringify(message))
   //  }

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
      type: 'add new item'
    }
    // this.socket.send(JSON.stringify(data))
    this.socket.emit('add new item', this.state.boardName)

  }

  undoAnItem = (boardName) => {
    const data = {
      boardName: boardName,
      type: 'undo an item'
    }
    // this.socket.send(JSON.stringify(data))
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