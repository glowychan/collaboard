import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SweetAlert from 'sweetalert-react';


class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      show: false
    })
    this.popout = this.popout.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

   popout() {
    this.props.onShare()
  }

  onDeleteClick = event => {
    const url = `${process.env.REACT_APP_SOCKETSERVER}/twoodles/${this.props.boardName}`
    axios.delete(url)
      .then(response => {
        this.props.deleteBoard(this.props.boardName)
        window.location = `/`;
        this.setState({ show: false })
      })
      .catch((error) => {
        console.log("error", error)
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
        <a className='bm-item-list side-item' onClick={this.popout}><i className='flaticon-sign'></i></a>
        <SweetAlert
          show={this.state.show}
          title="Are you sure?"
          type="warning"
          text="Once you delete your Twoodle you cannot get it back"
          showCancelButton
          onConfirm={this.onDeleteClick}
          onCancel={() => {
            this.setState({ show: false })
          }}
          />
          <a className='bm-item-list side-item' onClick={() => this.setState({ show: true })}><i className='flaticon-symbol-1'></i></a>
      </Menu>
    );
  };
};

export default SideBar