import React, {useState} from 'react';
import "./ShortText.css"
import {EditText} from "react-edit-text";
import {useStateValue} from "../../../../../../../StateProvider";
function ShortText(props) {

    const [name, setName] = useState();
    const [state, dispatch] = useStateValue()


    let className = "short-text"
    if(props.isStudent) {
        className = "radio-text student"
    }


    function changeName(value) {
        setName(value.value)
        dispatch({
            type:'SET_ANSWERS',
            index: props.index,
            answer: {
                type:"text_based",
                index: props.index,
                response:{
                    student_id:localStorage.getItem('studentId'),
                    answer: value.value,
                }
            },
        })
    }


    return (
        <div className={"short-text-wrapper"} >
            <EditText onSave={changeName} readonly={!props.isStudent} defaultValue={name} className={className} placeholder={"Short Answer Text"}/>
        </div>

    );
}

export default ShortText;