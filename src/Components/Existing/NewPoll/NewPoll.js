import React from 'react';
import "./NewPoll.css"
import pollsIcon from "../../../img/icon.svg"
import {useNavigate} from "react-router-dom";
import axios from "axios";

function NewPoll(props) {
    const navigate = useNavigate();

    function getOnClick() {
        const createPoll = axios.post('http://localhost:9000/polls/create',{},{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        const createQuestions = axios.post('http://localhost:9000/polls/populate',{},{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })

        return async () => {
            await axios.all([createPoll,createQuestions]).then(axios.spread((...res) => {
                console.log("sending poll creation request")
                console.log(res[0]);
                console.log("sending question creation request")
                console.log(res[1]);
                localStorage.setItem('pollId', res[0].data._id);
                localStorage.setItem('questionsId', res[1].data._id);
                console.log(localStorage.getItem('pollId'));
                console.log(localStorage.getItem('questionsId'));
                navigate("/create-poll")
            })).catch(err => console.log(err.message))
        };
    }

    return (
        <div className={"base"}  onClick={getOnClick} >
            <img src={pollsIcon} />
            <h6>Create a new Poll</h6>
        </div>
    );
}

export default NewPoll;