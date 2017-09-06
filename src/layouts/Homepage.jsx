import React, { Component } from 'react';
import axios from 'axios';

export default class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }

    this.submitForm = this.submitForm.bind(this);

  }

  // NOTE: there should be a limited acceptable characters for the bordname
  render() {
     return (
      <div>
        <form onSubmit={this.submitForm}>
          <input placeholder="Twoodle Name" name="boardName"/>
          <button>submit</button>
        </form>
        <p>{this.state.error}</p>
      </div>
    );
  }

  submitForm = (event) => {
    event.preventDefault();
    event.persist();
    const regex = /^[a-z0-9]+$/;
    let boardName = event.target.boardName.value;
    boardName = boardName.replace(' ','-');

     if (regex.test(boardName)) {

      axios.get(`http://localhost:3001/?boardName=${boardName}`)
        .then((response) => {
          window.location = `/twoodles/${boardName}`;
        })
        .catch((error) => {
          this.setState({error: 'Twoodle name is already taken.'});
        });

     }
     else {
       this.setState({error: 'Please use alphanumerical characters'});
     }
  }
}