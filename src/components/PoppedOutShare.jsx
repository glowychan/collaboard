import React from 'react'
import { ShareButtons, generateShareIcon } from 'react-share';

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const EmailIcon = generateShareIcon('email');
const LinkedinIcon = generateShareIcon('linkedin');

const {
            FacebookShareButton,
            GooglePlusShareButton,
            LinkedinShareButton,
            TwitterShareButton,
            TelegramShareButton,
            WhatsappShareButton,
            PinterestShareButton,
            VKShareButton,
            OKShareButton,
            RedditShareButton,
            EmailShareButton,
          } = ShareButtons;


class PoppedOutShare extends React.Component {
  constructor(props) { 
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);           
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  
  componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
  }


  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
          this.props.onClose()
      }
  }
   
  render() {
    if(this.props.isOpen === false)
    return null 

    return (
      <div ref={this.setWrapperRef} className='share-pop'>
      <div className='url-share'>
      <h2>Share your Twoodle URL and draw with friends</h2>
        <input className='share-url' id='share' type='text' defaultValue={'https://twoodle-board.com/' + this.props.url} readOnly /> 
      </div>
      <div className='social-share'>
        <FacebookShareButton title="Twoodle" quote="Check out my latest Twoodle" url={'https://twoodle-board.com/' + this.props.url}>
          <FacebookIcon size={60} round />
        </FacebookShareButton>
        <TwitterShareButton>
          <TwitterIcon size={60} round/>
        </TwitterShareButton>
        <LinkedinShareButton>
          <LinkedinIcon size={60} round/>
        </LinkedinShareButton>
        <EmailShareButton>
          <EmailIcon size={60} round/>
        </EmailShareButton>
      </div>
      </div>
    )
  }
}

export default PoppedOutShare 