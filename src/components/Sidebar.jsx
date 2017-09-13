import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
import axios from 'axios'
import home from '../icons/003-symbols.png'
import newtwoodle from '../icons/002-symbol-2.png'
import share from '../icons/004-sign.png'
import trashcan from '../icons/006-symbol-1.png'

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.popout = this.popout.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

   popout() {
    this.props.onShare()
  }

  onDeleteClick = (event) => {
    const url = `http://localhost:3001/twoodles/${this.props.boardName}`
    axios.delete(url)
      .then((response) => {
        this.props.deleteBoard(this.props.boardName)
        window.location = `/`;
      })
      .catch((error) => {
        console.log("error", error)
      })
    }

  render () {
    return (
    <Menu className="bm-menu"
    pageWrapId={ "page-wrap" }
    outerContainerId={ "outer-container" }
    width={ '4%' } >
        <Link className="bm-item-list side-item" to="/"><img className='home' src={home} /></Link>
        <Link className="bm-item-list side-item" to="/"><img className='twoodle' src={newtwoodle} /></Link>
        <a className='bm-item-list side-item' onClick={this.popout}><img src={share} /> </a>
        <a className='bm-item-list side-item' onClick={this.onDeleteClick}><img src={trashcan} /> </a>
    </Menu>
    );
  };
};

export default SideBar