import React from 'react'
import { TOOL_PENCIL } from '../components/tools/Pencil';
import { TOOL_LINE } from '../components/tools/Line';
import { TOOL_ELLIPSE } from '../components/tools/Ellipse';
import { TOOL_RECTANGLE } from '../components/tools/Rectangle';
import { TOOL_BRUSH } from '../components/tools/Brush';
import { TOOL_ERASER } from '../components/tools/Eraser';
import ColorPicker from './ColorPicker';
import FillPicker from './FillPicker';
import AddImage from './AddImage'
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
import undo from '../icons/undo.png'
import picture from '../icons/picture.png'
import phone from '../icons/telephone.png'



class Toolbar extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      color: '#fff',
      fillColor: '#fff',
      fill: false

    }

    this.changeColor = this.changeColor.bind(this)
    this.changeFill = this.changeFill.bind(this)
    this.fillColor = this.fillColor.bind(this)
  }
  
  changeColor = (color) => {
    this.setState({ color: color})
    this.props.changeColor(this.state.color)
  }

   changeFill= (e) => {
    this.props.changeFill(e.target.checked)
    this.setState({
      fill: e.target.checked
    })
  }
 
 fillColor = (color) => {
    this.setState({
      fillColor: color
    })
    this.props.changeFillColor(this.state.fillColor)
  }
  
  render () {
    return (
       <div className='toolbar'>
           <button
             onClick={() => this.props.undoAnItem(this.props.boardName)}
           ><img className='icon' src={undo} title='Undo' alt='Undo'/></button>

          <button
           onClick={() => this.props.deleteAllItems(this.props.boardName)}><img className='icon' src={clear} title='Clear board' alt='Clear board'/> </button>

          <button
           onClick={() => this.props.addImage}><img className='icon image' src={picture} title='Add image' alt='Add image' /> </button>

            <button
              style={this.props.tool == TOOL_PENCIL ? {fontWeight:'bold'} : undefined}
              className={this.props.tool == TOOL_PENCIL  ? 'item-active' : 'item'}
              onClick={this.props.setPencil}
            ><img className='icon' src={pencil} title='Pencil' alt='Pencil'/></button>

            <button
              style={this.props.tool == TOOL_BRUSH ? {fontWeight:'bold'} : undefined}
              className={this.props.tool == TOOL_BRUSH  ? 'item-active' : 'item'}
              onClick={this.props.setBrush}
            ><img className='icon' src={paint} title='Paint brush' alt='Paint brush' /></button>

            <button
              style={this.props.tool == TOOL_LINE ? {fontWeight:'bold'} : undefined}
              className={this.props.tool == TOOL_LINE  ? 'item-active line' : 'item line'}
              onClick={this.props.setLine}
            ><img className='icon' src={line} title='Line' alt='Line' /></button>

            <button
              style={this.props.tool == TOOL_ELLIPSE ? {fontWeight:'bold'} : undefined}
              className={this.props.tool == TOOL_ELLIPSE  ? 'item-active' : 'item'}
              onClick={this.props.setCircle}
            ><img className='icon' src={circle} title='Circle' alt='Circle' /></button>

            <button
              style={this.props.tool == TOOL_RECTANGLE ? {fontWeight:'bold'} : undefined}
              className={this.props.tool == TOOL_RECTANGLE  ? 'item-active' : 'item'}
              onClick={this.props.setRect}
            ><img className='icon' src={sqaure} title='Rectangle' alt='Rectangle'/></button>

            <button
              style={this.props.tool == TOOL_ERASER ? {fontWeight:'bold'} : undefined}
              className={this.props.tool == TOOL_ERASER  ? 'item-active' : 'item'}
              onClick={this.props.setEraser}
            ><img className='icon' src={eraser} title='Eraser' alt='Eraser'/></button>
            <label htmlFor="" className='size'>SIZE: </label>
            <input min="1" max="20" className='size'type="range" value={this.props.size} onChange={this.props.changeSize} />
            <ColorPicker value={this.props.color} newColor={this.changeColor}/>
          {(this.props.tool == TOOL_ELLIPSE || this.props.tool == TOOL_RECTANGLE) ?
            <div className='fill'>
              <label htmlFor="">FILL:</label>
              <input className="checkbox" type="checkbox" value={this.state.fill} style={{margin:'0 8'}}
                     onChange={this.changeFill}/>
              {this.state.fill ? <span>
                  <FillPicker value={this.state.fillColor} newFill={this.fillColor}/>
                </span> : ''}
            </div> : ''}
        </div>
    )
  }

}

export default Toolbar 