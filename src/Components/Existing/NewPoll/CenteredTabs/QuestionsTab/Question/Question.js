import React, {useEffect, useRef, useState} from 'react';
import {EditText} from "react-edit-text";
import 'react-edit-text/dist/index.css';
import './Question.css'
import AnimatedDropdown from "./Animated DropDown/AnimatedDropDown";
import 'react-dropdown/style.css';
import ShortText from "./ShortText/ShortText";
import MultipleChoice from "./MultipleChoice/MultipleChoice";
import {fadeIn} from "react-animations";
import styled, {keyframes} from "styled-components";
import {Trash} from 'lucide-react'
import {useSpring,animated} from "react-spring";
import {scale} from "react-animations/lib/utils";

const FadeIn = styled.div`
      animation: 0.5s ${keyframes(fadeIn)};
    `;

function Question(props) {
    const [name, setName] = useState(props.question.statement);
    const [isAdded, setIsAdded] = useState(0);
    const [question, setQuestion] = useState(props.question);

    function changeName(value) {
        setName(value.value)
        setQuestion(props.rename(value.value,props.id))
    }

    const [selected, setSelected] = useState(props.question.type);

    const HandleSelection = (val) => {
        setSelected(val)
    }


    const url = ""

    // useEffect(() => {
    //     return () => {
    //         fetch(url, {
    //             method: "POST", headers: {
    //                 'Content-Type': 'application/json', boyd: JSON.stringify({
    //                     name: name.value,
    //                 })
    //             }
    //         })
    //     };
    // }, [name]);


    function deleteHandler() {
        props.onDelete(props.id);
    }

    function onSwitch(type){
        setQuestion(props.switch(name,props.id,type))
    }


    function addOptionHandler(index,option) {
        props.onAddOption(index,option)
        return question.options[question.options.length-1]
    }

    function deleteOptionHandler(questionIndex,optionIndex) {
        return props.onDeleteOption(questionIndex,optionIndex)
    }



    const [style, animate] = useSpring(()=>({
        to: { opacity: 1, },
        from: { opacity: 0,},
        config: { duration: 150 },
    }))


    return (<animated.div style={{opacity: style.opacity}} className={"question-body"}>

        <div  className={"question-heading"}>
            <div>
                <EditText defaultValue={name} placeholder={"Untitled Question"} onSave={changeName} className={"question-title"}/>
            </div>
            <div className={"dropdown-questions"}>
                <AnimatedDropdown id={props.id} switch={onSwitch} text={props.question.statement} selected={selected} onSelection={HandleSelection}/>
            </div>
        </div>
        <FadeIn>
            <div className={"question-details"}>
                {selected === "TextBased" ? <ShortText/> : <MultipleChoice onDeleteOption={deleteOptionHandler} onAddOption={addOptionHandler} id={props.id} question={question} />}
            </div>
        </FadeIn>
        <div className={"question-delete-wrapper"} >
            <Trash className={"question-delete-icon"} strokeWidth={2} onClick={()=>deleteHandler()} size={35}  />
        </div>
    </animated.div>);
}


export default Question;