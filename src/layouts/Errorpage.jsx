import React, { Component } from 'react'
import axios from 'axios'

export default class Error extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url:''
    }
    this.getGif = this.getGif.bind(this)
 }

 componentDidMount() {
   this.getGif()
 }

 getGif = () => {
   axios.get(`http://api.giphy.com/v1/gifs/random?api_key=df85a405d9194efcb483d6d77c5dcba7&tag=looking&rating=g`)
        .then((response) => {
          this.setState({
            url:response.data.data.image_url
          })
        })
        .catch((error) => {
          console.log('Whoops.. No Gif for you!')
        });
 }

render() {
     return (
      <div className='error-container'>
        <span className='four'> FOUR<a className='oh'>OH</a>FOUR</span>
          <span className='error-msg'>We are looking for your page... but can't find it</span>
          <img className='gif' src={this.state.url} />
      </div>
    )
  }
}