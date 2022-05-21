import React, {useEffect, useRef, useState} from 'react';
import {Puff} from "react-loading-icons";
import {ChevronLeft} from "lucide-react";
import pollsLogo from "../../img/logo.svg";
import {useNavigate} from "react-router-dom";
import {useStateValue} from "../../StateProvider";
import {toast} from "react-toastify";
import axios from "axios";

function PollSubmissionNav(props) {

    const navigate = useNavigate();

    const [{published_on, deadline, is_question_empty, is_option_empty, changed}, dispatch] = useStateValue()


    const publishedOnRef = useRef(published_on);
    publishedOnRef.current = published_on

    const deadlineRef = useRef(deadline);
    deadlineRef.current = deadline

    const isQuestionEmptyRef = useRef(is_question_empty);
    isQuestionEmptyRef.current = is_question_empty

    const isOptionEmptyRef = useRef(is_option_empty);
    isOptionEmptyRef.current = is_option_empty

    const [overlayClass, setOverlayClass] = useState("loading-overlay");

    const finalizeUrl = 'http://localhost:9000/polls/finalize/' + localStorage.getItem('pollId');
    const editQuestionUrl = 'http://localhost:9000/polls/edit/' + localStorage.getItem('pollId');


    function validationChecks(published_on,deadline,isQuestionEmpty,isOptionEmpty){
        setOverlayClass("loading-overlay")

        if (isQuestionEmpty) {
            toast.error("Question statement can't be empty")
            return false;
        }
        if (isOptionEmpty) {
            toast.error("Option statement can't be empty")
            return false;

        }
        if (published_on == null) {
            toast.error("Posting Date can't be empty")
            return false;

        }
        else if (published_on.getTime() < new Date().getTime()) {
            toast.error("Posting Date can't be a past date")
            return false;

        }
        if (deadline == null) {
            toast.error("Deadline can't be empty")
            return false;

        }
        else if (deadline.getTime() <= new Date().getTime()) {
            toast.error("Deadline Date can't be a past date")
            return false;

        }
        return true;

    }

    async function finalizeRequest(){
        setOverlayClass("loading-overlay visible")
        const publishRequest = await axios.post(editQuestionUrl, {
            published: true,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            console.log("sending request")
            console.log(res);
        }).catch(err => console.log(err.message))

        const responseRequest = await axios.get(finalizeUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })

        axios.all([publishRequest,responseRequest]).then(axios.spread ((...responses) => {
            console.log("sending finalize request")
            console.log("responses[0]");
            console.log(responses[0]);
            console.log("responses[1]");
            console.log(responses[1]);
            setOverlayClass("loading-overlay")
            navigate('/view-polls');
        })).catch(errs => console.log(errs))



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

    async function finalizeHandler() {
        if (changed) {
            setOverlayClass("loading-overlay visible")
            const timer = setTimeout(async () => {
                if (validationChecks(publishedOnRef.current, deadlineRef.current, isQuestionEmptyRef.current, isOptionEmptyRef.current)) {
                    await finalizeRequest()
                }

            }, 2500);
            return () => {
                clearTimeout(timer)
            };
        } else {
            if (validationChecks(published_on, deadline, is_question_empty, is_option_empty)) {
                await finalizeRequest()
            }
        }
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
                <button className="logout reg-button" onClick={finalizeHandler}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default PollSubmissionNav;