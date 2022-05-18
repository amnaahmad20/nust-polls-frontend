import React, {useState} from 'react';
import {EditText} from "react-edit-text";
import {Minus} from "lucide-react";
import "./Choice.css"
import $ from 'jquery'
function Choice(props) {

    const [name, setName] = useState(props.value);
    const [option, setOption] = useState(props.option);

    function changeName(value){
        setName(value.value)
        setOption(props.onRename(props.index,value.value))
    }

    function deleteOption(){
        props.onDelete(props.index)
    }


    return (
        <div    className={"radio-container row"} >
        <div className={"radio-option row"} >

            <label className="container">
                <input disabled={true} type="radio" value={props.value} name={props.name} />
                    <span className="checkmark"/>
            </label>
            <EditText readonly={props.published} inline={true} defaultValue={name} placeholder={props.value} onSave={changeName} className={"radio-text"} />
        </div>
        { props.length > 1 && !props.published && <Minus strokeWidth={5} size={25} id={"delete-option"} onClick={deleteOption}>Delete</Minus>}
        </div>
);
}

export default Choice;