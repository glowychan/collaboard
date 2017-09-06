import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class SideBar extends Component {
  render () {
    return (
    <Menu className="bm-menu"
    pageWrapId={ "page-wrap" }
    outerContainerId={ "outer-container" }
    width={ '5%' } >
        <Link className="bm-item-list" to="/">HOME</Link>
        <Link className="bm-item-list" to="/twoodles">TWOODLES</Link>
    </Menu>

    );
  };
};


export default SideBar;