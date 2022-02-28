import React from 'react'
import "./css/dashboard.css"
import banner from "./img/banner.png"


function Banner() {
  return (
    <div className='banner'>
      <img src={banner} alt='banner'/>
    </div>
  )
}

export default Banner