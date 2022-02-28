import React from 'react'
import "./css/dashboard.css"


import Banner from "./Banner"
import Details from "./Details"

function Dashboard() {
  return (
        <div className='dashboard'> 
            <Details />
            <Banner />
        </div>

    
  )
}

export default Dashboard