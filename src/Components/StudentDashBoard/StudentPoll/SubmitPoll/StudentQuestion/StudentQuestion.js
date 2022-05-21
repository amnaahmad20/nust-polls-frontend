import React, {useState} from 'react';
import {EditText} from "react-edit-text";
import ShortText from "../../../../Existing/NewPoll/CenteredTabs/QuestionsTab/Question/ShortText/ShortText";
import MultipleChoice
    from "../../../../Existing/NewPoll/CenteredTabs/QuestionsTab/Question/MultipleChoice/MultipleChoice";
import styled, {keyframes} from "styled-components";
import {fadeIn} from "react-animations";
import {animated, useSpring} from "react-spring";


const FadeIn = styled.div`
  animation: 0.5s ${keyframes(fadeIn)};
`;


function StudentQuestion(props) {


    const [name, setName] = useState(props.question.statement);
    const [isAdded, setIsAdded] = useState(0);
    const [question, setQuestion] = useState(props.question);

    const [selected, setSelected] = useState(props.question.type);


    const [style, animate] = useSpring(() => ({
        to: {opacity: 1,},
        from: {opacity: 0,},
        config: {duration: 150},
    }))


    return (
        <animated.div style={{opacity: style.opacity}} className={"question-body"}>


            <div className={"question-heading"}>
                    <p
                              className={"question-title student-wrap"}>{"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaname"}</p>

            </div>
            <FadeIn>
                <div className={"question-details"}>
                    {selected === "TextBased" ? <ShortText isStudent={true} /> : <MultipleChoice isStudent={true} published={props.published}
                                                                               id={props.id} question={question}/>}
                </div>
            </FadeIn>
        </animated.div>
    );
}

export default StudentQuestion;