import React from 'react'


class UserNamePopout extends React.Component {
  constructor(props) { 
    super(props);

  }
 
   
  render() {
    
    if(this.props.isOpen === false)
    return null 

    return (
      <div className='name-pop'>
          <h2 className='name-label'>Enter your image URL</h2>
          <form className='new-user'onSubmit={this.props.onClose}>
          <input className='user-name' id='user' name="imageUrl"/>
          <button type='submit' className='user-submit'></button>
          </form>
     </div>
    )
  }
}

export default UserNamePopout