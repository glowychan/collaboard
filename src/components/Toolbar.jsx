
import React from 'react'
import { TOOL_PENCIL } from '../components/tools/Pencil';
import { TOOL_LINE } from '../components/tools/Line';
import { TOOL_ELLIPSE } from '../components/tools/Ellipse';
import { TOOL_RECTANGLE } from '../components/tools/Rectangle';
import { TOOL_BRUSH } from '../components/tools/Brush';
import { TOOL_ERASER } from '../components/tools/Eraser';
import ColorPicker from '../components/ColorPicker';
import FillPicker from '../components/FillPicker';
import logo from '../icons/007-square.png';
import pencil from '../icons/011-tool.png'
import line from '../icons/008-two.png'
import circle from '../icons/009-circle.png'
import sqaure from '../icons/010-square.png'
import textbox from '../icons/symbols.png'
import paint from '../icons/paint.png'
import save from '../icons/001-symbols-1.png'
import clear from '../icons/001-circle.png'
import eraser from '../icons/eraser.png'

class Toolbar extends React.Component {

  render() {
    return (
      <div className='toolbar'>
          <div className="tools" style={{marginBottom:20}}>
          <button 
           onClick={() => this.props.sketch.handleClear()}><img className='icon' src={clear} /> </button>
          
          <button 
           onClick={() => this.props.sketch.handleSave()}><img className='icon' src={save} /> </button>
           
            <button
              style={this.props.tool == TOOL_PENCIL ? {fontWeight:'bold'} : undefined}
              className={this.props.tool == TOOL_PENCIL  ? 'item-active' : 'item'}
              onClick={() => this.props.setTool(TOOL_PENCIL)}
            ><img className='icon' src={pencil} /></button>

            <button
              style={this.props.tool == TOOL_BRUSH ? {fontWeight:'bold'} : undefined}
              className={this.props.tool == TOOL_BRUSH  ? 'item-active' : 'item'}
              onClick={() =>  this.props.setTool(TOOL_BRUSH)}
            ><img className='icon' src={paint} /></button>

            <button
              style={this.props.tool == TOOL_LINE ? {fontWeight:'bold'} : undefined}
              className={this.props.tool == TOOL_LINE  ? 'item-active' : 'item'}
              onClick={() =>  this.props.setTool(TOOL_LINE)}
            ><img className='icon' src={line} /></button>

            <button
              style={this.props.tool == TOOL_ELLIPSE ? {fontWeight:'bold'} : undefined}
              className={this.props.tool == TOOL_ELLIPSE  ? 'item-active' : 'item'}
              onClick={() =>  this.props.setTool(TOOL_ELLIPSE)}
            ><img className='icon' src={circle} /></button>

            <button
              style={this.props.tool == TOOL_RECTANGLE ? {fontWeight:'bold'} : undefined}
              className={this.props.tool == TOOL_RECTANGLE  ? 'item-active' : 'item'}
              onClick={() =>  this.props.setTool(TOOL_RECTANGLE)}
            ><img className='icon' src={sqaure} /></button>

            <button
              style={this.props.tool == TOOL_ERASER ? {fontWeight:'bold'} : undefined}
              className={this.props.tool == TOOL_ERASER  ? 'item-active' : 'item'}
              onClick={() =>  this.props.setTool(TOOL_ERASER)}
            ><img className='icon' src={eraser} /></button>
          </div>
          <div className="options" style={{marginBottom:20}}>
            <label htmlFor="">SIZE: </label>
            <input min="1" max="20" type="range" value={this.props.size} onChange={this.props.setSize()} />
            <ColorPicker value={this.props.color} newColor={this.props.changeColor}/>
          </div>
          {(this.props.tool == TOOL_ELLIPSE || this.props.tool == TOOL_RECTANGLE) ?
            <div className='fill'>
              <label htmlFor="">FILL IN:</label>
              <input className="checkbox" type="checkbox" value={this.props.fill} style={{margin:'0 8'}}
                     onChange={this.props.checked()} />
              {this.props.fill ? <span>
                  <FillPicker value={this.props.fill} newFill={this.props.setFill()}/>
                </span> : ''}
            </div> : ''}
          </div>
    );
  }
}


export default Toolbar