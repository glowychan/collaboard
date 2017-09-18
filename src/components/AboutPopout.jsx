import React, { Component } from 'react'
import about from '../icons/About.png'

class AboutPopout extends Component {
  constructor(props) {
    super(props)
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside)
    }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setWrapperRef(node) {
      this.wrapperRef = node
    }

  handleClickOutside(event) {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
          this.props.onClose()
      }
  }

  render() {
    if(!this.props.isOpen)
    return null
    return (
      <div ref={this.setWrapperRef} className='about-pop'>
         <img src={about} alt='about' />
    </div>
    )
  }
}

export default AboutPopout