import React from 'react'
import "../Dashboard/dashboard.css"
import {useNavigate} from "react-router-dom";


function Details() {
    const navigate = useNavigate();

    return (
    <div className='details'>
      <h2 className='head1'>Get all your insights in one place</h2>
      <h3 className='head2'>Creating polls was never easier</h3>
      <div className='button-grp'>
        <button className={"dark-button"} onClick={() => navigate("/create-poll")} >Create a new Poll</button>
        <button onClick={() => navigate("/view-polls")} className='no-fill stroke-button'>View Existing</button>
      </div>
    </div>
  )
}

export default Details