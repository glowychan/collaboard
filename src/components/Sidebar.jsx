import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import home from '../icons/003-symbols.png';
import newtwoodle from '../icons/002-symbol-2.png';
import share from '../icons/004-sign.png';
import trashcan from '../icons/006-symbol-1.png';
import PoppedOutShare from './PoppedOutShare';
import SweetAlert from 'sweetalert-react';


class SideBar extends Component {
  constructor(props) {
    super(props)
    this.popout = this.popout.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
     this.state = ({
      show: false
    })
  }

   popout() {
    this.props.onShare();
  }

  onDeleteClick = (event) => {
    const url = `http://localhost:3001/twoodles/${this.props.boardName}`
    axios.delete(url)
      .then((response) => {
        this.props.deleteBoard(this.props.boardName)
        window.location = `/`;
        this.setState({ show: false })
      })
      .catch((error) => {
        console.log("error");
      });
    }

  render () {
    return (
    <Menu className="bm-menu"
    pageWrapId={ "page-wrap" }
    outerContainerId={ "outer-container" }
    width={ '6%' } >
        <Link className="bm-item-list side-item" to="/"><i className='flaticon-symbols'></i></Link>
        <Link className="bm-item-list side-item" to="/"><i className='flaticon-symbol'></i></Link>
        <a href="#" className='bm-item-list side-item' onClick={this.popout}><i className='flaticon-sign'></i> </a>
        <SweetAlert
        show={this.state.show}
        title="Are you sure?"
        type="warning"
        text="Once you delete your Twoodle you cannot get it back"
        showCancelButton
        onConfirm={this.onDeleteClick}
        onCancel={() => {
            this.setState({ show: false });
          }}
      />
        <a className='bm-item-list side-item' onClick={() => this.setState({ show: true })}><i className='flaticon-symbol-1'></i> </a>
    </Menu>

    );
  };
};


export default SideBar;