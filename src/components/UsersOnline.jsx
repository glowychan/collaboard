import React from 'react'

const UsersOnline = ({ users }) => (
  <div className='user-container'>
    {users.map((user) => {
      return <div className='online-user' style={{background: '#6ED3CF'}} key={user.id}>
        <p> {user.name} </p>
      </div>
    })}
  </div>
)

export default UsersOnline