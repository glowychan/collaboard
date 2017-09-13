import React from 'react'
import About from '../icons/About.png'

class UserNamePopout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if(!this.props.isOpen)
    return null

    return (
      <div ref={this.setWrapperRef} className='name-pop'>
        <h2 className='name-label'>Enter your name:</h2>
        <form className='new-user'onSubmit={this.props.onClose}>
        <input className='user-name' id='user' name="userName"/>
        <button type='submit' className='user-submit'></button>
        </form>
     </div>
    )
  }
}

// This should be a functional component because state is not stored
// But isOpen does not work
// const UserNamePopout = ({ isOpen, setWrapperRef, onClose }) => (
//   if (!isOpen) {
//     return null;
//   }
//   <div ref={setWrapperRef} className='name-pop'>
//     <h2 className='name-label'>Enter your name:</h2>
//     <form className='new-user'onSubmit={onClose}>
//     <input className='user-name' id='user' name="userName"/>
//     <button type='submit' className='user-submit'></button>
//     </form>
//   </div>
// )

export default UserNamePopout