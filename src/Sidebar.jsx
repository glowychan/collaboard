import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import home from './icons/003-symbols.png'
import twoodle from './icons/007-square.png'
import save from './icons/001-symbols-1.png'
import share from './icons/004-sign.png'


class SideBar extends Component {

  

  render () {
    return (
    <Menu className="bm-menu"
    pageWrapId={ "page-wrap" }
    outerContainerId={ "outer-container" }
    width={ '5%' } >
        <Link className="bm-item-list side-item" to="/"><img className='home' src={home} /></Link>
        <Link className="bm-item-list side-item" to="/twoodles"><img className='twoodle' src={twoodle} /></Link>
        <a href="#" className='bm-item-list side-item'><img src={share} /> </a>
    </Menu>

    );
  };
};


export default SideBar;