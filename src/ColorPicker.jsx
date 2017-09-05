'use strict'

import React from 'react'
import reactCSS from 'reactcss'
import { CirclePicker } from 'react-color'

class ColorPicker extends React.Component {
  state = {
    background: '#fff',
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  render() {
    return (
      <CirclePicker
        color={ this.state.background } width = {200}
        onChangeComplete={ this.handleChangeComplete }
      />
    );
  }
}

export default ColorPicker