import React from 'react'
import "../Dashboard/dashboard.css"
import banner from "../../img/nust.png"


function Banner() {
    return (
        <div className='banner'>
            <img src={banner} alt='banner'/>
        </div>
    )
}

export default Banner