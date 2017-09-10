import React from 'react'




class UsersOnline extends React.Component {
  constructor(props) { 
    super(props);
   this.randomColor = this.randomColor.bind(this)
  }
 
  randomColor = () => {
   return '#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1,6);
  }
   
  render() {

    return (
    <div className='user-container'>
      <div className='online-user' style={{background: this.randomColor()}}>
        <p> AMY </p>
     </div>
     <div className='online-user' style={{background: this.randomColor()}}>
        <p> RAYHANEH </p>
     </div>
     <div className='online-user' style={{background: this.randomColor()}}>
        <p> GLORIA </p>
     </div>
    </div>
    )
  }
}

export default UsersOnline