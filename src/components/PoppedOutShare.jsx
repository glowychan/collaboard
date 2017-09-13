import React, { Component } from 'react'
import { ShareButtons, generateShareIcon } from 'react-share'

const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const EmailIcon = generateShareIcon('email')
const LinkedinIcon = generateShareIcon('linkedin')

const {
        FacebookShareButton,
        GooglePlusShareButton,
        LinkedinShareButton,
        TwitterShareButton,
        EmailShareButton,
      } = ShareButtons

class PoppedOutShare extends Component {
  constructor(props) {
    super(props)
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
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
    const URL = "https://twoodle-board.com/" + this.props.url

    if(!this.props.isOpen)
    return null

    return (
      <div ref={this.setWrapperRef} className='share-pop'>
        <div className='url-share'>
          <h2>Share your Twoodle URL and draw with friends</h2>
          <input className='share-url' id='share' type='text' defaultValue={'https://twoodle-board.com/' + this.props.url} readOnly />
        </div>
        <div className='social-share'>
          <FacebookShareButton title="Twoodle" quote="Check out my latest Twoodle" picture='https://static.tumblr.com/a084c14f08f0fa56a12f1c79fc90aa16/sl6w7fs/qQHockr0d/tumblr_static_tumblr_static_axzrmvvucm0c80wwwwc8g8kko_640.jpg' url={URL}>
            <FacebookIcon size={60} round />
          </FacebookShareButton>
          <TwitterShareButton title="Check out my latest Twoodle" url={'https://twoodle-board.com/' + this.props.url} hashtags={['Twoodle', 'CollaborationTools']}>
            <TwitterIcon size={60} round/>
          </TwitterShareButton>
          <LinkedinShareButton title="Check out my latest Twoodle" url={'https://twoodle-board.com/' + this.props.url}>
            <LinkedinIcon size={60} round/>
          </LinkedinShareButton>
          <EmailShareButton subject="Let's collaborate! Join my Twoodle Board" body={"Lets visualize our ideas. Check out my latest Twoodle Board here: https://twoodle-board.com/" + this.props.url}>
            <EmailIcon size={60} round/>
          </EmailShareButton>
        </div>
      </div>
    )
  }
}

export default PoppedOutShare