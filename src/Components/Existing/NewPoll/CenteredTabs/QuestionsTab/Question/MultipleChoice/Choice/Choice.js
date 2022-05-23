import React, {useEffect, useState} from 'react';
import {EditText} from "react-edit-text";
import {Minus} from "lucide-react";
import "./Choice.css"
import {useStateValue} from "../../../../../../../../StateProvider";

function Choice(props) {

    const [name, setName] = useState(props.value);
    const [option, setOption] = useState(props.option);
    const [state, dispatch] = useStateValue()
    const [invalid, setInvalid] = useState("");
    const [value, setValue] = useState("");

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
        radioClass = "radio-option row student-height no-event"
    }

    useEffect(() => {
        if(name === "") setInvalid("invalid")
        else setInvalid("")
    }, [name]);

    useEffect(() => {
        props.getValueHandler(value)
    }, [value]);


    function onClickHandler(value) {
        console.log(value.target.value)
        setValue(value.target.value)
        dispatch({
            type:'SET_ANSWERS',
            index: props.questionIndex,
            answer: {
                type:"mcq",
                index: props.questionIndex,
                response:{
                    student_id:localStorage.getItem('studentId'),
                    answer: props.index,
                }
            },
        })

    }

    return (<div className={"radio-container row "}>
        <div className={radioClass +" "+ invalid}>
            <label className={className}>
                <input  onClick={onClickHandler} disabled={false} type="radio" value={props.value} name={props.name}/>
                <span className={"checkmark"+ invalid}/>
            </label>
            {props.isStudent ?
                <p className={"radio-text radio-wrap"}>{name}</p> :
                <div className={"radio-text-wrapper" }>
                    {/*<p className={"radio-text"} >aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>*/}

                    <EditText readonly={props.published} inline={true} defaultValue={name}
                              placeholder={"Unnamed Option"} onSave={changeName} className={"radio-text"+" "+ invalid+"-text"}/>
                </div>}

        </div>
        {props.length > 1 && !props.published &&
            <Minus strokeWidth={5} size={25} id={"delete-option"} onClick={deleteOption}>Delete</Minus>}
    </div>);
}

export default Choice;