import React from 'react'

class PoppedOutShare extends React.Component {
  constructor(props) { 
    super(props);
console.log(this.props.url)
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
      <h2>Share your Twoodle URL and draw with friends</h2>
        <input className='share-url' id='share' type='text' defaultValue={'https://twoodle-board.com/' + this.props.url} readOnly /> 
      </div>
    )
  }
}

export default PoppedOutShare 