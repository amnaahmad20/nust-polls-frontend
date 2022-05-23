import React, {useEffect, useState} from 'react';
import {EditText} from "react-edit-text";
import ShortText from "../../../../Existing/NewPoll/CenteredTabs/QuestionsTab/Question/ShortText/ShortText";
import MultipleChoice
    from "../../../../Existing/NewPoll/CenteredTabs/QuestionsTab/Question/MultipleChoice/MultipleChoice";
import styled, {keyframes} from "styled-components";
import {fadeIn} from "react-animations";
import {animated, useSpring} from "react-spring";
import './StudentQuestion.css'
import {useStateValue} from "../../../../../StateProvider";

const FadeIn = styled.div`
  animation: 0.5s ${keyframes(fadeIn)};
`;


function StudentQuestion(props) {


    const [name, setName] = useState(props.question.statement);
    const [isAdded, setIsAdded] = useState(0);
    const [question, setQuestion] = useState(props.question);

    const [selected, setSelected] = useState(props.question.type);

    const [empty, setEmpty] = useState("");
    const [val, setVal] = useState(null);
    const [{submit,answers}, dispatch] = useStateValue()

    const [style, animate] = useSpring(() => ({
        to: {opacity: 1,},
        from: {opacity: 0,},
        config: {duration: 150},
    }))


    useEffect(() => {
        return () => {
            if (val !== "" && val != null ) setEmpty("")
        };
    }, [val]);



    function getValue(value) {
        setVal(value)
    }

    useEffect(() => {
        if(submit){

            if (answers.length === 0)
                setEmpty("empty")
            else {
                answers[props.id] == null ? setEmpty("empty") : answers[props.id].response.answer === "" ? setEmpty("empty") : setEmpty("")
            }
        }
    }, [submit]);

    return (
        <animated.div style={{opacity: style.opacity}} className={"question-body"+' '+empty}>


            <div className={"question-heading"}>
                    <p
                              className={"question-title student-wrap"}>{name}</p>

            </div>
            <FadeIn>
                <div className={"question-details"}>
                    {selected === "TextBased" ? <ShortText questionsLength={props.questionsLength} getValueHandler={getValue} index={props.id} isStudent={true} /> : <MultipleChoice questionsLength={props.questionsLength} getValueHandler={getValue} index={props.id} isStudent={true} published={props.published}
                                                                               id={props.id} question={question}/>}
                </div>
            </FadeIn>
        </animated.div>
    );
}

export default StudentQuestion;