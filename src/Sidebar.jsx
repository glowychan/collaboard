import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import home from './icons/003-symbols.png'
import twoodle from './icons/007-square.png'

class SideBar extends Component {
  render () {
    return (
    <Menu className="bm-menu"
    pageWrapId={ "page-wrap" }
    outerContainerId={ "outer-container" }
    width={ '5%' } >
        <Link className="bm-item-list" to="/"><img className='home' src={home} /></Link>
        <Link className="bm-item-list" to="/twoodles"><img className='twoodle' src={twoodle} /></Link>
    </Menu>

    );
  };
};


export default SideBar;