import React from 'react'
import About from '../icons/About.png'

class UserNamePopout extends React.Component {
  constructor(props) { 
    super(props);

  }
 
 
   
  render() {
    
    if(this.props.isOpen === false)
    return null 

    return (
      <div ref={this.setWrapperRef} className='name-pop'>
          <h2 className='name-label'>Enter your name:</h2>
          <form className='new-user'/>
          <input className='user-name' id='user' name="userName"/>
          <button type='submit' className='user-submit' onClick={this.props.onClose}>submit</button>
     </div>
    )
  }
}

export default UserNamePopout