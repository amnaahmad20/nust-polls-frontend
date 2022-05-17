import React from 'react';
import pollsLogo from "../../img/logo.svg";
import {ChevronLeft} from 'lucide-react'
import "./PollCreationNav.css"
import {useNavigate} from "react-router-dom";

function PollCreationNav(props) {

    const navigate = useNavigate();

    function saveHandler() {
        //to do
        navigate('/dash');
    }

    function backHandler() {
        //to do
        navigate('/dash');
    }

    return (
        <div className="nav">
            <div>

            <ChevronLeft className={"back-arrow"} color={"#085B91"} size={40} onClick={backHandler} />
            <img src={pollsLogo} alt="logo" />
            </div>
                <button className="logout reg-button" onClick={saveHandler}>
                    Finalize
                </button>
        </div>
    );
}

export default PollCreationNav;
