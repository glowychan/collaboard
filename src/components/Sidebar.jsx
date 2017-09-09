import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import home from '../icons/003-symbols.png';
import newtwoodle from '../icons/002-symbol-2.png';
import save from '../icons/001-symbols-1.png';
import share from '../icons/004-sign.png';
import trashcan from '../icons/006-symbol-1.png';
import PoppedOutShare from './PoppedOutShare';


class SideBar extends Component {
  constructor(props) {
      super(props)
      this.popout = this.popout.bind(this)
    }

   popout() {
      this.props.onShare()
    }
    
  render () {
    return (
    <Menu className="bm-menu"
    pageWrapId={ "page-wrap" }
    outerContainerId={ "outer-container" }
    width={ '4%' } >
        <Link className="bm-item-list side-item" to="/"><img className='home' src={home} /></Link>
        <Link className="bm-item-list side-item" to="/"><img className='twoodle' src={newtwoodle} /></Link>
        <a href="#" className='bm-item-list side-item' onClick={this.popout}><img src={share} /> </a>
        <a href="#" className='bm-item-list side-item'><img src={trashcan} /> </a>
    </Menu>

    );
  };
};


export default SideBar;