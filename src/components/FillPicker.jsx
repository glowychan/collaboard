
import React from 'react'
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
        color={ this.state.background } 
        width={145} 
        circleSize={15}
        colors={["#E62739", "#6ED3CF", "#9068BE", "#464646", "#181818"]}
        onChangeComplete={ this.handleChangeComplete }
      />
    );
  }
}


export default FillPicker