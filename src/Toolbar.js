import React, { Component } from 'react'
import { connect } from 'react-redux';
import { selectTool } from './actions'
import { bindActionCreators } from 'redux'
import { findDOMNode } from 'react-dom'

class Toolbar extends Component {
  constructor(props) {
    super(props)

    this.onMouseDown = this.onMouseDown.bind(this)
  }

  componentDidMount() {
    this.canvas = findDOMNode(this.canvasRef)
  }

  onMouseDown(e) {
    console.log('mousedown', this.props.currentTool.onMouseDown)
    // if (this.props.currentTool) {
    //   const data = this.props.currentTool.onMouseDown(...this.getCursorPosition(e), '#000', '2px')

    //   // if (this.props.onDebouncedItemChange) {
    //   //   this.interval = setInterval(this.onDebouncedMove, this.props.debounceTime)
    //   // }
    //   console.log("data", data)
    }

  }

  getCursorPosition(e) {

    const { top, left } = this.canvas.getBoundingClientRect()
    return ([
      e.clientX - left,
      e.clientY - top
    ])
  }

  render() {
    return (
      <div>
        <div>
          {this.props.currentTool}
        </div>
        <button onClick={() => this.props.selectTool("pencil")}>Pencil</button>
        <button onClick={() => this.props.selectTool("line")}>Line</button>
        <div >
          <canvas width='200px' height='200px' style={{border: '1px solid red'}}
          ref={(canvas) => { this.canvasRef = canvas; }}
          onMouseDown={this.onMouseDown}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { currentTool: state.currentTool }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectTool: selectTool}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)