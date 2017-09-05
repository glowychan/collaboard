import React, { Component } from 'react';
import { push as Menu } from 'react-burger-menu'

class SideBar extends Component {
  render () {
    return (
    <Menu className="bm-menu" 
    pageWrapId={ "page-wrap" } 
    outerContainerId={ "outer-container" }
    width={ '20%' } >
        <a className="bm-item-list" to="/">+ Home</a>
        <a className="bm-item-list" to="/courses">+ New</a>
        <a className="bm-item-list" to="/about">+ Share</a>
    </Menu>

    );
  };
};


export default SideBar;