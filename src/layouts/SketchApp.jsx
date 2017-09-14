import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SketchPad from '../components/SketchPad';
import { TOOL_PENCIL } from '../components/tools/Pencil';
import { TOOL_LINE } from '../components/tools/Line';
import { TOOL_ELLIPSE } from '../components/tools/Ellipse';
import { TOOL_RECTANGLE } from '../components/tools/Rectangle';
import { TOOL_BRUSH } from '../components/tools/Brush';
import { TOOL_ERASER } from '../components/tools/Eraser';
import WebRTC from '../components/WebRTC';
import Sidebar from '../components/Sidebar';
import PoppedOutShare from '../components/PoppedOutShare.jsx';
import ColorPicker from '../components/ColorPicker';
import FillPicker from '../components/FillPicker';
import UserNamePopout from '../components/UserNamePopout';
import UsersOnline from '../components/UsersOnline'
import AddImage from '../components/AddImage'
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
      items: this.props.items,
      poppedOpen: false,
      nameOpen: true,
      addImage: false,
    }
    this.handleShare = this.handleShare.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.closeOtherPops = this.closeOtherPops.bind(this);
    this.addImage = this.addImage.bind(this);
  }


  componentWillReceiveProps ({undo, clear}) {
    if (undo || clear) {
      this.refs.sketch.handleClear()
    }
  }

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

  handleShare (popup) {
    this.setState({
      poppedOpen: true
    })
  }

  closeOtherPops() {
    this.setState({
      poppedOpen: false,
    })
  }
  
  addImage = (event) => {
   event.preventDefault()
   let imageUrl = event.target.imageUrl.value
   let pattern = /^((http|https|ftp):\/\/)/;

   if (!(pattern.test(imageUrl))) {
      imageUrl = `https://${imageUrl}`
   }
  
   let image = {
     url: imageUrl,
     tool: 'image'
   }

   this.setState({
      addImage: false
    })
  
  this.props.addNewItem(image, this.props.boardName)
  }

  closePopup = (event) => {
    event.preventDefault()
    let userName = event.target.userName.value
    this.props.newUserName(userName)
    this.setState({
      nameOpen: false,
      joinCall: true
    })
  }


render() {
    const { tool, size, color, fill, fillColor } = this.state;
    return (
      <div>
        <h1><img className='logo' src={logo} />TWOODLE</h1>
        <Sidebar onShare={this.handleShare} boardName={this.props.boardName} deleteBoard={this.props.deleteBoard} />
        <UserNamePopout isOpen={this.state.nameOpen} onClose={this.closePopup} />
        <AddImage isOpen={this.state.addImage} onClose={this.addImage}/>
        {this.state.poppedOpen ? 
        <div className='popout-container'>
        <PoppedOutShare isOpen={this.state.poppedOpen} onClose={this.closeOtherPops} url={this.props.boardName}/>
        </div>
        : ''}
        <div className='toolbar'>
           <button
             onClick={() => this.props.undoAnItem(this.props.boardName)}
           ><i className='flaticon-arrows' title='Undo' alt='Undo'></i></button>

          <button
           onClick={() => this.props.deleteAllItems(this.props.boardName)}><i className='flaticon-shape' title='Clear board' alt='Clear board'></i> </button>

          <button
           onClick={() => this.refs.sketch.handleSave()}><i className='flaticon-symbols-1'  title='Save board' alt='Save'></i> </button>

          <button
           onClick={() => this.setState({addImage: true})}><i className='flaticon-picture-hanging-in-a-frame-hand-drawn-symbol'  title='Add image' alt='Add image'></i> </button>

            <button
              style={tool == TOOL_PENCIL ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_PENCIL  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_PENCIL})}
            ><i className='flaticon-tool' title='Pencil' alt='Pencil'></i></button>

            <button
              style={tool == TOOL_BRUSH ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_BRUSH  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_BRUSH})}
            ><i className='flaticon-paint' title='Paint Brush' alt='Paint Brush'></i></button>

            <button
              style={tool == TOOL_LINE ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_LINE  ? 'item-active line' : 'item line'}
              onClick={() => this.setState({tool:TOOL_LINE})}
            ><i className='flaticon-two' title='Line' alt='Line'></i></button>

            <button
              style={tool == TOOL_ELLIPSE ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_ELLIPSE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_ELLIPSE})}
            ><i className='flaticon-circle'  title='Circle' alt='Circle'></i></button>

            <button
              style={tool == TOOL_RECTANGLE ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_RECTANGLE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_RECTANGLE})}
            ><i className='flaticon-square' title='Rectangle' alt='Rectangle'></i></button>

            <button
              style={tool == TOOL_ERASER ? {fontWeight:'bold'} : undefined}
              className={tool == TOOL_ERASER  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:TOOL_ERASER})}
            ><i className='flaticon-remove' title='Eraser' alt='Eraser'></i></button>
            <label htmlFor="" className='size'>SIZE: </label>
            <input min="1" max="20" className='size'type="range" value={size} onChange={(e) => this.setState({size: parseInt(e.target.value)})} />
            <ColorPicker value={color} newColor={this.changeColor.bind(this)}/>
          {(this.state.tool == TOOL_ELLIPSE || this.state.tool == TOOL_RECTANGLE) ?
            <div className='fill'>
              <label htmlFor="">FILL:</label>
              <input className="checkbox" type="checkbox" value={fill} style={{margin:'0 8'}}
                     onChange={(e) => this.setState({fill: e.target.checked})} />
              {fill ? <span>
                  <FillPicker value={fill} newFill={this.changeFill.bind(this)}/>
                </span> : ''}
            </div> : ''}
          </div>
          {this.state.joinCall && 
          <WebRTC roomName={this.props.boardName} endChat={this.state.clicked}/>
           }
          
        <div>
          <SketchPad
            ref='sketch'
            width={2000}
            height={1200}
            animate={false}
            size={size}
            color={color}
            fillColor={fill ? fillColor : ''}
            items={this.props.items}
            tool={tool}
            onCompleteItem={(item) => this.props.addNewItem(item, this.props.boardName)}
            onSave={this.handleSave}
          />
        </div>
        <UsersOnline users={this.props.users} />
      </div>
    );
  }
}