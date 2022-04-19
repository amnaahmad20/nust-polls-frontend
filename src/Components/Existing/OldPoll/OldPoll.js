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


    function renameHandler(url,name) {
        const data = {
            name: name,
            id: props.id
        }
        axios.post(url,data).then(response => {
            console.log(data);
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    function toggleList() {
        setListOpen(!listOpen);
    }

    return (

        <div className={"base2"}>

            <div className={"cover"}>

                <img src={nust} alt={"form-img"}/>

                <button onClick={toggleList}>
                    <MoreHorizontal color={"#085B91"} strokeWidth={"2"} size={"17"}/>
                </button>
                {listOpen && (<FadeIn><DropDown closeDropDown={toggleList} oldName={props.text} renameHandler={renameHandler} /></FadeIn>)}
            </div>
            <div className={"text"}>
                <h6>{props.text}</h6>
                <p>Created On : {props.date}</p>
            </div>
        </div>);
}

export default OldPoll;