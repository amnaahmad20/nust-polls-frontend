import React from 'react';
import nust from "../../../img/nust.png";
import {MoreHorizontal} from "lucide-react";
import {DropDown} from "../../DropDown/DropDown";
import {useNavigate} from "react-router-dom";
import './StudentPoll.css'
function StudentPoll(props) {

    const navigate = useNavigate();

    function getOnClick() {
        localStorage.setItem('pollId', props.id)
        navigate("/submit-poll")
    }

    return (
        <div className={"base2"}>

            <div className={"student-cover"}>

                <img src={nust} onClick={getOnClick} alt={"form-img"}/>

            </div>
            <div className={"student-text"} onClick={getOnClick}>
                <h6>{props.text}</h6>
                <p>Created On : {new Date(props.date).toLocaleDateString(
                    'en-gb',
                    {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'utc'
                    }
                )}</p>
            </div>
        </div>
    );
}

export default StudentPoll;