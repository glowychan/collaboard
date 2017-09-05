import React, { Component } from 'react';
import axios from 'axios';

export default class Homepage extends Component {

  render() {
     return (
      <div>
        <form onSubmit={this.submitForm}>
          <input placeholder="Your Name (Optional)" name="username"/>
          <button>submit</button>
        </form>

      </div>
    );
  }

  submitForm = (event) => {
    event.preventDefault();
    console.log(event.target.username.value);

    axios.get(`http://localhost:3001/?newURL=${event.target.username.value}`)
      .then(function (response) {
        console.log("this is a response");
      })
      .catch(function (error) {
        console.log("this is an error");
      });
  }
}