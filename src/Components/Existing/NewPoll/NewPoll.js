import React from 'react';
import "./NewPoll.css"
import pollsIcon from "../../../img/icon.svg"
import {useNavigate} from "react-router-dom";

function NewPoll(props) {
    const navigate = useNavigate();

    return (
        <div className={"base"} onClick={() => navigate("/create-poll")} >
            <img src={pollsIcon} />
            <h6>Create a new Poll</h6>
        </div>
    );
}

export default NewPoll;