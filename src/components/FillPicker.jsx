
import React, { Component } from 'react'
import { CirclePicker } from 'react-color'

class FillPicker extends Component {
  state = {
    background: '#fff',
  }

  handleChangeComplete = color => {
    this.setState({ background: color.hex })
    this.props.newFill(this.state.background)
  }

  render() {
    return (
      <CirclePicker
        color={this.state.background}
        width={145}
        circleSize={13}
        colors={["#FF0000", "#FFC300", "#529749", "#2196f3", "#000000"]}
        onChangeComplete={this.handleChangeComplete}
      />
    )
  }
}

export default FillPicker