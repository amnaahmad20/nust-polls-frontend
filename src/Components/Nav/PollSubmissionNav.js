import React, {useEffect, useRef, useState} from 'react';
import {Puff} from "react-loading-icons";
import {ChevronLeft} from "lucide-react";
import pollsLogo from "../../img/logo.svg";
import {useNavigate} from "react-router-dom";
import {useStateValue} from "../../StateProvider";
import {toast} from "react-toastify";
import axios from "../../axios";
function PollSubmissionNav(props) {

    const navigate = useNavigate();

    const [{published_on, deadline, is_question_empty, is_option_empty, changed, answers, questions_length,is_questions_unfilled}, dispatch] = useStateValue()


    const publishedOnRef = useRef(published_on);
    publishedOnRef.current = published_on

    const deadlineRef = useRef(deadline);
    deadlineRef.current = deadline

    const isQuestionEmptyRef = useRef(is_question_empty);
    isQuestionEmptyRef.current = is_question_empty


    const isQuestionsUnfilledRef = useRef(is_questions_unfilled);
    isQuestionsUnfilledRef.current = is_questions_unfilled

    const isOptionEmptyRef = useRef(is_option_empty);
    isOptionEmptyRef.current = is_option_empty

    const [overlayClass, setOverlayClass] = useState("loading-overlay");

    const submitUrl = '/polls/student/response/' + localStorage.getItem('pollId');

    function validationChecks(){

        if(isQuestionsUnfilledRef.current){
            toast.error("All questions need to be attempted")
            return false
        }

        // if (isQuestionEmpty) {
        //     toast.error("Question statement can't be empty")
        //     return false;
        // }
        // if (isOptionEmpty) {
        //     toast.error("Option statement can't be empty")
        //     return false;
        //
        // }
        // if (published_on == null) {
        //     toast.error("Posting Date can't be empty")
        //     return false;
        //
        // }
        // else if (published_on.getTime() < new Date().getTime()) {
        //     toast.error("Posting Date can't be a past date")
        //     return false;
        //
        // }
        // if (deadline == null) {
        //     toast.error("Deadline can't be empty")
        //     return false;
        //
        // }
        // else if (deadline.getTime() <= new Date().getTime()) {
        //     toast.error("Deadline Date can't be a past date")
        //     return false;
        //
        // }
        return true;

    }


    useEffect(() => {
        if(!is_questions_unfilled) {
            if (validationChecks()) {
                setOverlayClass("loading-overlay visible")

                axios.post(submitUrl, {
                    answers: answers
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                }).then(res => {
                    console.log("sending submit request")
                    console.log("res");
                    console.log(res);
                    setOverlayClass("loading-overlay")
                    navigate('/student');
                }).catch(errs => console.log(errs))
            }
        }

    }, [is_questions_unfilled]);

    async function submitRequest(){

        dispatch({
            type:"SUBMIT",
            submit: true
        })


        // console.log("before timeout")
        // console.log(is_questions_unfilled);
        //
        // const timer = setTimeout(async () => {
        //     console.log("after timeout")
        //     console.log(isQuestionsUnfilledRef.current);
        //
        // }, 20);
        //
        // return () => {
        //     clearTimeout(timer)
        // };


    }

    useEffect(() => {
        if (changed) {
            const timer = setTimeout(async () => {
                dispatch({
                    type: 'SET_IS_CHANGED', changed: false,
                })
            }, 2500);
            return () => {
                clearTimeout(timer)
            };
        }
    }, [changed])

    async function submitHandler() {
        // if (changed) {
        //     setOverlayClass("loading-overlay visible")
        //     const timer = setTimeout(async () => {
        //         // if (validationChecks(publishedOnRef.current, deadlineRef.current, isQuestionEmptyRef.current, isOptionEmptyRef.current)) {
        //         // }
        //         await finalizeRequest()
        //
        //     }, 500);
        //     return () => {
        //         clearTimeout(timer)
        //     };
        // } else {
        //     if (validationChecks(published_on, deadline, is_question_empty, is_option_empty)) {
                await submitRequest()
            // }
        // }
    }

    function backHandler() {
        //to do
        navigate(-1);
    }

    function homeHandler() {

        navigate('/dash');
    }

    return (
        <div>

            <div className={overlayClass}><Puff className={"loader"} transform={"scale(2)"} stroke="#085B91"
                                                strokeOpacity={.125} speed={.75}/></div>
            <div className="nav">

                <div>

                    <ChevronLeft className={"back-arrow"} color={"#085B91"} size={40} onClick={backHandler}/>
                    <img src={pollsLogo} onClick={homeHandler} alt="logo"/>
                </div>
                <button className="logout reg-button" onClick={submitHandler}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default PollSubmissionNav;