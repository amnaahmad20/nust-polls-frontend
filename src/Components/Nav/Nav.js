import React from 'react'
import "./nav.css"
import pollsLogo from "../../img/logo.svg"
import {useNavigate} from "react-router-dom";

function Nav(props) {
    const navigate = useNavigate();

    return (<div className='nav'>
        <img src={pollsLogo} alt="logo"/>
        {props.isLoggedIn && <button className='logout reg-button' onClick={() => navigate("/")}>Log Out</button>}
    </div>)
}

export default Nav