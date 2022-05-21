import React, {useEffect, useRef, useState} from 'react';
import {Puff} from "react-loading-icons";
import {animated, useSpring} from "react-spring";
import {useStateValue} from "../../../../StateProvider";
import axios from "axios";
import {MCQ, Option, Questions, TextBased} from "../../../Existing/NewPoll/CenteredTabs/QuestionsTab/QuestionsTab";
import StudentQuestion from "./StudentQuestion/StudentQuestion";
import './SubmitPoll.css'

function SubmitPoll(props) {

    let today = new Date()
    today.setHours(11, 59, 0, 0)

    const questionsList = new Questions()

    const [name, setName] = useState("");

    const [description, setDescription] = useState("");

    const [questions, setQuestions] = useState(questionsList.questions);

    // const [data, setData] = useState();
    //
    const [mcq, setMcq] = useState([]);

    const [textBased, setTextBased] = useState(questions[0] ? [questions[0].statement] : []);

    const [isChanged, setIsChanged] = useState(false);

    const [isPublished, setIsPublished] = useState(false);


    const [isQuestionEmpty, setIsQuestionEmpty] = useState(false);
    const [isOptionEmpty, setIsOptionEmpty] = useState(false);

    const mcqRef = useRef(mcq);
    mcqRef.current = mcq;

    const textBasedRef = useRef(textBased);
    textBasedRef.current = textBased;

    const isQuestionEmptyRef = useRef(isQuestionEmpty);
    isQuestionEmptyRef.current = isQuestionEmpty

    const isOptionEmptyRef = useRef(isOptionEmpty);
    isOptionEmptyRef.current = isOptionEmpty

    // useEffect(() => {
    //     return () => {
    //         console.log(questions)
    //
    //         axios.post(url, {
    //             questions: questions
    //         }).then(res => {
    //             console.log("sending request")
    //             console.log(res);
    //         })
    //     };
    // }, [questions]);

    const ref = useRef(null);
    const [style, animate] = useSpring(() => ({height: "0px"}), []);
    const [toggle, setToggle] = useState(false);

    const [state, dispatch] = useStateValue()

    const fetchUrl = 'http://localhost:9000/polls/ques/' + localStorage.getItem('pollId');

    const [loading, setLoading] = useState(true);

    // const [isCreated, setIsCreated] = useState(props.isCreeated);

    useEffect(function () {
        const fetchData = async () => {
            try {

                await axios.get(fetchUrl, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    // setPollsData(response.data);
                    console.log("this is fetch response.data");
                    console.log(response.data);
                    localStorage.setItem('questionId', response.data.questions[0]._id)
                    setName(response.data.poll_name)
                    setDescription(response.data.description)
                    setQuestions(fetchQuestions(response.data.questions[0].mcq ? response.data.questions[0].mcq : [], response.data.questions[0].text_based ? response.data.questions[0].text_based : []))
                    setIsPublished(response.data.published)
                });
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };
        // if(isCreated) {
        fetchData().then(r => console.log("fetch request complete"))

        // }
        return {
            loading,
        };
    }, []);


    useEffect(() => {
        animate({
            height: (ref.current.offsetHeight: 0) + "px"
        });
    }, [animate, ref, toggle]);

    useEffect(() => {
        setTimeout(() => setToggle(!toggle), 0);
    }, [toggle, setToggle]);

    // useEffect(() => {
    //     if (isChanged) {
    //         const timer = setTimeout(async () => {
    //             console.log('This will send a request after 2 seconds!')
    //
    //             await axios.post(editQuestionUrl, {
    //                 mcq: mcqRef.current, text_based: textBasedRef.current
    //             }, {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //                 }
    //             }).then(res => {
    //                 console.log("sending request")
    //                 console.log(res);
    //                 console.log("time left");
    //                 dispatch({
    //                     type: 'SET_IS_EMPTY',
    //                     is_question_empty: isQuestionEmptyRef.current,
    //                     is_option_empty: isOptionEmptyRef.current,
    //                 })
    //                 // if (!isCreated) setIsCreated(true)
    //                 setIsChanged(false)
    //             }).catch(err => console.log(err.message))
    //         }, 2000);
    //         return () => {
    //             clearTimeout(timer)
    //         };
    //
    //     }
    // }, [isChanged])


    // async function onSubmit() {
    //     await axios.post(url, {
    //         poll: localStorage.getItem('pollId'), mcq: mcq, text_based: textBased
    //     }).then(res => {
    //         console.log("sending change desc request")
    //         console.log(res);
    //     }).catch(err => console.log(err.message))
    // }


    function fetchQuestions(mcq, textBased) {
        const newQuestions = []
        mcq.forEach(m => {
            const newOptions = []
            m.options.forEach(o => {
                newOptions.push(new Option(o))
            })
            newQuestions[m.index] = new MCQ(m.statement, newOptions)
        })

        textBased.forEach(t => {
            newQuestions[t.index] = new TextBased(t.statement)
        })

        return newQuestions
    }


    return (<div className={"student-main-container"}>
        <div className={"student-container"}>

            {loading && questions.length > 0 &&
                <div style={{"paddingTop": "41px"}}><Puff height={"150px"} transform={"scale(2)"} stroke="#085B91"
                                                          strokeOpacity={.125} speed={.75}/></div>}
            {/*<button onClick={onSubmit}> test submit</button>*/}

            <animated.div style={{
                overflow: "hidden", width: "100%", ...style
            }}>
                <div ref={ref} className={!isPublished ? "poll-header" : "poll-header read-only"}>
                    {!loading && <div>
                        <p
                            className={"poll-name student-wrap"}>{name}</p>
                        <p
                            className={"poll-desc student-wrap"}>{description}</p>
                    </div>}
                    {!loading && questions.length > 0 && questions.map((question) => (<StudentQuestion key={question.id}
                                                                                                       id={questions.indexOf(question)}
                                                                                                       question={question}
                                                                                                       published={isPublished}/>))}
                </div>
            </animated.div>
        </div>

    </div>);
}

export default SubmitPoll;