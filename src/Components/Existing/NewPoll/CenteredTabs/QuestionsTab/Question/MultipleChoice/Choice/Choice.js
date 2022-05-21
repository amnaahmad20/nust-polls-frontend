import React, {useState} from 'react';
import {EditText} from "react-edit-text";
import {Minus} from "lucide-react";
import "./Choice.css"

function Choice(props) {

    const [name, setName] = useState(props.value);
    const [option, setOption] = useState(props.option);

    function changeName(value) {
        setName(value.value)
        setOption(props.onRename(props.index, value.value))
    }

    function deleteOption() {
        props.onDelete(props.index)
    }

    let className = "container"
    let radioClass = "radio-option row"
    if (props.isStudent) {
        className = "container student"
        radioClass = "radio-option row student-height"
    }

    return (<div className={"radio-container row"}>
        <div className={radioClass}>
            <label className={className}>
                <input disabled={false} type="radio" value={props.value} name={props.name}/>
                <span className="checkmark"/>
            </label>
            {props.isStudent ?
                <p className={"radio-text radio-wrap"}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasasdfasdfasfasdfasdfadsaaaaaaa</p> :
                <div className={"radio-text-wrapper"}>
                    {/*<p className={"radio-text"} >aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>*/}

                    <EditText readonly={props.published} inline={true} defaultValue={name}
                              placeholder={"Unnamed Option"} onSave={changeName} className={"radio-text"}/>
                </div>}

        </div>
        {props.length > 1 && !props.published &&
            <Minus strokeWidth={5} size={25} id={"delete-option"} onClick={deleteOption}>Delete</Minus>}
    </div>);
}

export default Choice;