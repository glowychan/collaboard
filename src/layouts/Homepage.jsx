import React, { Component } from 'react';
import AboutPopout from '../components/AboutPopout';
import axios from 'axios';
import brand from '../icons/TWOODLE.png';
import about from '../icons/Howitworks.png';
import woman from '../icons/woman.png'
import facebook from '../icons/facebook.png'
import twitter from '../icons/twitter.png'
import instagram from '../icons/instagram.png'
import alert from '../icons/alert.png'

export default class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      poppedOpen: false
    }
   
    this.closePopup  = this.closePopup.bind(this)
    this.submitForm = this.submitForm.bind(this);

  }

  openPopup = () => {
   this.setState({
      poppedOpen: true
    })
  }
  
  closePopup = () => {
    this.setState({
      poppedOpen: false
    })
  }

  submitForm = (event) => {
    event.preventDefault();
    event.persist();
    const regex = /^[a-z0-9]+$/;
    let boardName = event.target.boardName.value;
    boardName = boardName.toLowerCase().replace(' ','-');

     if (regex.test(boardName)) {

      axios.get(`http://localhost:3001/?boardName=${boardName}`)
        .then((response) => {
          window.location = `/twoodles/${boardName}`;
        })
        .catch((error) => {
          this.setState({error: 'Twoodle name is already taken. Please try another one.'});
          this.refs.boardName.value="";
        });

     }
     else {
       this.setState({error: 'Please use alphanumerical characters'});
     }
  }

  // NOTE: there should be a limited acceptable characters for the bordname
  render() {
     return (
     <div className='main-container'> 
     {this.state.error ? 
      <div className='error-message' >
        <p>{this.state.error}</p>
      </div> : ''}
      <div className='jumbotron'>
      <img className='home-logo' src={brand} />
        <form className='new-twoodle'
        onSubmit={this.submitForm}>
          <input className='twoodle-name' name="boardName" ref='boardName'/>
          <button className='twoodle-submit'>submit</button>
          <img className='about' onClick={this.openPopup} src={about} />
           <AboutPopout onClose={this.closePopup} isOpen={this.state.poppedOpen} />
        </form>
        <h2 className='slogan'>Welcome to your whiteboard <span className='purple'>on the web</span></h2>
        <footer className='footer'>
          <p className='copy'> ©2017 Twoodle Inc.</p>
          <div className= 'built-by'>
            <p>Follow us on </p>
            <img src={facebook} />
            <img src={instagram} />
            <img src={twitter} />
          </div>
        </footer>
      </div>
    </div>
    );
  }
}