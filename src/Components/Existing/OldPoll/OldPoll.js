import React, {useState} from 'react';
import "./OldPoll.css"
import nust from "../../../img/nust.png"
import {MoreHorizontal} from "lucide-react";
import {DropDown} from "../../DropDown/DropDown";
import styled, {keyframes} from "styled-components";
import {fadeIn} from "react-animations";
import axios from "axios";

const FadeIn = styled.div`
      animation: 0.25s ${keyframes(fadeIn)};
    `;

function OldPoll(props) {


    const [listOpen, setListOpen] = useState(false);

    const [name, setName] = useState(props.text);

    async function renameHandler(newName) {
        await axios.post('http://localhost:9000/polls/edit/' + props.id, {poll_name: newName},{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            console.log(res);
            setName(newName)
        }).catch(error=>{
            console.log(error.message);
        })
    }

    function toggleList() {
        setListOpen(!listOpen);
    }

    async function deleteHandler() {
        await axios.post('http://localhost:9000/polls/delete/' + props.id, {},{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            console.log(res);
            props.deletePoll(props.id);
        }).catch(error=>{
            console.log(error.message);
        })
    }

    return (

        <div className={"base2"}>

            <div className={"cover"}>

                <img src={nust} alt={"form-img"}/>

                <button onClick={toggleList}>
                    <MoreHorizontal color={"#085B91"} strokeWidth={"2"} size={"17"}/>
                </button>
                {listOpen && (<FadeIn><DropDown closeDropDown={toggleList} oldName={props.text} renameHandler={renameHandler} deleteHandler={deleteHandler} /></FadeIn>)}
            </div>
            <div className={"text"}>
                <h6>{name}</h6>
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
        </div>);
}

export default OldPoll;