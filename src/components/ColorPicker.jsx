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
        color={ this.state.background } 
        width={155} 
        circleSize={13}
        colors={["#FF0000", "#FFC300", "#529749", "#2196f3",  "#000000"]}
        onChangeComplete={ this.handleChangeComplete }
      />
    );
  }
}

export default ColorPicker