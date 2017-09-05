import React, { Component } from 'react';
import { push as Menu } from 'react-burger-menu'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class SideBar extends Component {
  render () {
    return (
    <Menu className="bm-menu"
    pageWrapId={ "page-wrap" }
    outerContainerId={ "outer-container" }
    width={ '20%' } >
        <Link className="bm-item-list" to="/">Home</Link>
        <Link className="bm-item-list" to="/twoodles">Twoodles</Link>
    </Menu>

    );
  };
};


export default SideBar;