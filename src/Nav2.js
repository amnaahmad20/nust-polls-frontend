import React from 'react'
import "./css/nav2.css"
import pollsLogo from "./img/polls-logo.png"



function Nav2() {
  return (
    <div className='nav2'>

      <img src={pollsLogo} alt="logo" />
      <button className='logout'>Log Out</button>
      
    </div>
  )
}

export default Nav2