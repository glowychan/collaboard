import React from 'react'



class UsersOnline extends React.Component {
  constructor(props) { 
    super(props);
    console.log(this.props)
    this.randomColor = this.randomColor.bind(this)
  }
 
  randomColor = () => {
   return '#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1,6);
  }
  
  

  render() {
    const color = this.randomColor()
    return (
    <div className='user-container'>
      {this.props.users.map((name) => {
        return 
        <div className='online-user' style={{background: color}}>
          <p> {name} </p>
        </div>
      })}
    </div>
    )
  }
}

export default UsersOnline