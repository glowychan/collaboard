
import React from 'react'
import reactCSS from 'reactcss'
import { CirclePicker } from 'react-color'

class FillPicker extends React.Component {
  state = {
    background: '#fff',
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
    this.props.newFill(this.state.background)
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

export default FillPicker