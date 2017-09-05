import React, { Component } from 'react';
import axios from 'axios';

export default class Homepage extends Component {

  render() {
     return (
      <div>
        <form onSubmit={this.submitForm}>
          <input placeholder="Twoodle Name" name="boardId"/>
          <button>submit</button>
        </form>

      </div>
    );
  }

  submitForm = (event) => {
    event.preventDefault();
    console.log(event.target.boardId.value);

    axios.get(`http://localhost:3001/?newURL=${event.target.boardId.value}`)
      .then(function (response) {
        console.log("this is a response");
        //window.location.href(`/${event.target.boardId.value}`);
      })
      .catch(function (error) {
        console.log("this is an error");
      });
  }
}