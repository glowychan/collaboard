import React from 'react'



class UsersOnline extends React.Component {
  constructor(props) { 
    super(props);
  }
 
  // randomColor = () => {
  //  return '#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1,6);
  // }
  


  render() {
    const users = this.props.users

    return (
    <div className='user-container'>
      {users.map((name) => {
        return <div className='online-user' style={{background: '#6ED3CF'}}>
          <p> {name} </p>
        </div>
      })}
    </div>
    );
  }
}

export default UsersOnline