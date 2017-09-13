import React, { Component } from 'react'
import { CirclePicker } from 'react-color'

class ColorPicker extends Component {
  state = {
    background: '#fff'
  };

  handleChangeComplete = color => {
    this.setState({ background: color.hex })
    this.props.newColor(this.state.background)
  };

  render() {
    return (
      <CirclePicker
        color={this.state.background}
        width={155}
        circleSize={13}
        colors={["#E62739", "#6ED3CF", "#9068BE", "#464646", "#181818"]}
        onChangeComplete={this.handleChangeComplete}
      />
    );
  }
}

export default ColorPicker