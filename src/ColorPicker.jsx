import React from 'react'
import { CirclePicker } from 'react-color'

class ColorPicker extends React.Component {
  state = {
    background: '#fff',
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
    this.props.newColor(this.state.background)
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