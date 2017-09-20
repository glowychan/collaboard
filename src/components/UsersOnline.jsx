import React from 'react'

const UsersOnline = ({ users }) => (
  <div className='user-container'>
    {users.map((user) => {
      return <div className='online-user' style={{background: user.color}} key={user.id}>
        <p> {user.name} </p>
      </div>
    })}
  </div>
)

export default UsersOnline