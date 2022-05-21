import React, {useState} from 'react';
import "./ShortText.css"
import {EditText} from "react-edit-text";
function ShortText(props) {

    const [name, setName] = useState();
    let className = "short-text"
    if(props.isStudent) {
        className = "short-text student"
    }


    function changeName(value) {
        setName(value.value)
    }


    return (
        <EditText onSave={changeName} readonly={!props.isStudent} defaultValue={name} className={className} placeholder={"Short Answer Text"}/>
    );
}

export default ShortText;