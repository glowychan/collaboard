import React from 'react'

const UserNamePopout = ({ setWrapperRef, onClose }) => (
  <div ref={setWrapperRef} className='name-pop'>
    <h2 className='name-label'>Enter your name:</h2>
    <form className='new-user'onSubmit={onClose}>
    <input className='user-name' id='user' name="userName"/>
    <button type='submit' className='user-submit'></button>
    </form>
  </div>
)

export default UserNamePopout