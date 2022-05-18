import React from 'react';
import "./NewPoll.css"
import pollsIcon from "../../../img/icon.svg"
import {useNavigate} from "react-router-dom";
import axios from "axios";

function NewPoll(props) {
    const navigate = useNavigate();

    function getOnClick() {
        axios.post('http://localhost:9000/polls/create', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log("sending poll creation request")
            console.log(res);
            localStorage.setItem('pollId', res.data._id);
            console.log(localStorage.getItem('pollId'));
        }).then( axios.post('http://localhost:9000/polls/populate', {
            poll: localStorage.getItem('pollId')
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json'
            }
        }).then().then(res => {
            console.log("sending question creation request")
            console.log(res);
            localStorage.setItem('questionsId', res.data._id);
            console.log(localStorage.getItem('questionsId'));
            navigate("/create-poll")
        }).catch(err => console.log(err.message))).catch(err => console.log(err.message))
    }

    return (<div className={"base"} onClick={getOnClick}>
        <img src={pollsIcon}/>
        <h6>Create a new Poll</h6>
    </div>);
}

export default NewPoll;