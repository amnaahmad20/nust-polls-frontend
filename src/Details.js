import React from 'react'
import "./css/dashboard.css"


function Details() {
  return (
    <div className='details'>
      <h2 className='head1'>Get all your insights in one place</h2>
      <h4 className='head2'>Creating polls was never easier</h4>
      <div className='button-grp'>
        <button>Create a new Poll</button>
        <button className='no-fill'>View Existing</button>
      </div>
    </div>
  )
}

export default Details