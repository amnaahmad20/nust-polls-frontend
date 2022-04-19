import React from 'react'
import "./dashboard.css"


import Banner from "../Banner/Banner"
import Details from "../Details/Details"

function Dashboard() {
    return (<div className='dashboard'>
        <Details/>
        <Banner/>
    </div>)
}

export default Dashboard