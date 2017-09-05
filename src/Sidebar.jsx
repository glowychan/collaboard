import React, { Component } from 'react';
import { push as Menu } from 'react-burger-menu'

class SideBar extends Component {
  render () {
    return (
    <Menu className="bm-menu" pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } >
        <a className="bm-item-list" to="/">One</a>
        <a className="bm-item-list" to="/courses">Two</a>
        <a className="bm-item-list" to="/about">Three</a>
    </Menu>

    );
};
};


export default SideBar;