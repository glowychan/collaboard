import React, { Component } from 'react';
import SketchPad from '../components/SketchPad';
import { TOOL_PENCIL } from '../components/tools/Pencil';
import { TOOL_LINE } from '../components/tools/Line';
import { TOOL_ELLIPSE } from '../components/tools/Ellipse';
import { TOOL_RECTANGLE } from '../components/tools/Rectangle';
import SideBar from '../Sidebar';
import ColorPicker from '../ColorPicker';
import FillPicker from '../FillPicker';
import  logo from '../icons/007-square.png';

export default class SketchApp extends Component
{
  socket = null;

  constructor(props) {
    super(props);

    this.state = {
      tool:TOOL_PENCIL,
      size: 2,
      color: '#000000',
      fill: false,
      fillColor: '#444444',
      items: []
    }
  }

  // componentDidMount() {

  //   this.socket = new WebSocket("ws://localhost:3001")
  //   // Wait for new items and then add them to the DOM
  //   this.socket.onmessage = this.addNewItem;
  // }

  changeColor(color) {
    this.setState({
      color: color
    })
  }

  changeFill(color) {
    this.setState({
      fillColor: color
    })
  }

  // UPDATE THE STATE WITH THE NEW MESSAGES
  addNewItem = (receivedItem) => {
    // Parsed the recived messages object
    console.log(JSON.parse(receivedItem.data))
    this.setState({items: this.state.items.concat([JSON.parse(receivedItem.data)])})
  }

render() {
    const { tool, size, color, fill, fillColor, items } = this.state;
    return (
      <div>
        <h1><img className='logo' src={logo} />TWOODLE</h1>
        <p>{this.state.items}</p>
        <div style={{float:'left', marginRight:20}}>
          <SketchPad
            width={1200}
            height={1200}
            animate={true}
            size={size}
            color={color}
            fillColor={fill ? fillColor : ''}
            items={items}
            tool={tool}
            //onCompleteItem={(item) => this.socket.send(JSON.stringify(item))}
          />
        </div>
        <div className='toolbar' style={{float:'left'}}>
          <div className="tools" style={{marginBottom:20}}>
            <button
              style={tool == TOOL_PENCIL ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_PENCIL  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_PENCIL})}
            >PENCIL</button>
            <br />
            <button
              style={tool == TOOL_LINE ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_LINE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_LINE})}
            >LINE</button>
            <br />
            <button
              style={tool == TOOL_ELLIPSE ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_ELLIPSE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_ELLIPSE})}
            >ELLIPSE</button>
            <br />
            <button
              style={tool == TOOL_RECTANGLE ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_RECTANGLE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_RECTANGLE})}
            >RECTANGLE</button>
            <br />
            <button
              style={tool == TOOL_RECTANGLE ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_RECTANGLE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_RECTANGLE})}
            >TEXT BOX</button>
          </div>
          <div className="options" style={{marginBottom:20}}>
            <label htmlFor="">SIZE: </label>
            <input min="1" max="20" type="range" value={size} onChange={(e) => this.setState({size: parseInt(e.target.value)})} />
          </div>
          <div className="options" style={{marginBottom:20}}>
            <ColorPicker value={color} newColor={this.changeColor.bind(this)}/>
          </div>
          {(this.state.tool == TOOL_ELLIPSE || this.state.tool == TOOL_RECTANGLE) ?
            <div>
              <label htmlFor="">FILL IN:</label>
              <input className="checkbox" type="checkbox" value={fill} style={{margin:'0 8'}}
                     onChange={(e) => this.setState({fill: e.target.checked})} />
              {fill ? <span>
                  <FillPicker value={fill} newFill={this.changeFill.bind(this)}/>
                </span> : ''}
            </div> : ''}
        </div>
      </div>
    );
  }
}