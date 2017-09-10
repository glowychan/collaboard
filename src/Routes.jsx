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
      items: [],
      undo: false
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
        this.props.history.push('/error')
      }
      else {
        if (data.boardName === this.state.boardName) {
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
    this.socket.send(JSON.stringify(data))
  }

  undoAnItem = (item, boardName) => {
    item.tool = 'eraser'
    const data = {
      boardName: boardName,
      items: item,
      type: 'undo an item'
    }
    this.socket.send(JSON.stringify(data))
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