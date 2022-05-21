import React, {useEffect, useRef, useState} from 'react';
import {Plus} from 'lucide-react'
import './QuestionsTab.css'
import {EditText} from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import Question from "./Question/Question";
import {v4 as uuid} from 'uuid';
import {animated, useSpring} from "react-spring";
import axios from "axios";
import {Puff} from 'react-loading-icons'
import {useStateValue} from "../../../../../StateProvider";

export class MCQ {


    constructor(statement = "Untitled Question", options = [new Option("Option", 1)]) {
        this.optionNumber = 2
        this.id = uuid();
        this.type = "MCQ"
        this.statement = statement
        this.options = options
    }

    get number() {
        return this.optionNumber++;
    }

    isEmpty() {
        return this.text = ""
    }

}

export class Option {
    constructor(text = "Option", optionNumber) {
        this.id = uuid()
        optionNumber ? this.text = text + " " + (optionNumber) : this.text = text
    }


}

export class TextBased {
    constructor(statement = "") {
        this.id = uuid()
        this.type = "TextBased"
        this.statement = statement
    }

    isEmpty() {
        return this.text = ""
    }
}

export class Questions {
    constructor() {
        this.questions = []
        this.questions[0] = new TextBased()
    }


}


function QuestionsTab(props) {

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

    const url = 'http://localhost:9000/polls/edit/' + localStorage.getItem('pollId');
    const fetchUrl = 'http://localhost:9000/polls/ques/' + localStorage.getItem('pollId');
    const editQuestionUrl = 'http://localhost:9000/polls/edit-ques/' + localStorage.getItem('questionId');

    const [loading, setLoading] = useState(true);

    // const [isCreated, setIsCreated] = useState(props.isCreeated);

    useEffect(
        function () {
            const fetchData = async () => {
                try {

                    await axios.get(fetchUrl, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json'
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
        },
        []
    );


    useEffect(() => {
        animate({
            height: (ref.current.offsetHeight: 0) + "px"
        });
    }, [animate, ref, toggle]);

    useEffect(() => {
        setTimeout(() => setToggle(!toggle), 0);
    }, [toggle, setToggle]);

    useEffect(() => {
        if (isChanged) {
            const timer = setTimeout(async () => {
                console.log('This will send a request after 2 seconds!')

                await axios.post(editQuestionUrl, {
                    mcq: mcqRef.current, text_based: textBasedRef.current
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                }).then(res => {
                    console.log("sending request")
                    console.log(res);
                    console.log("time left");
                    dispatch({
                        type: 'SET_IS_EMPTY',
                        is_question_empty: isQuestionEmptyRef.current,
                        is_option_empty: isOptionEmptyRef.current,
                    })
                    // if (!isCreated) setIsCreated(true)
                    setIsChanged(false)
                }).catch(err => console.log(err.message))
            }, 2000);
            return () => {
                clearTimeout(timer)
            };

        }
    }, [isChanged])


    async function onSubmit() {
        await axios.post(url, {
            poll: localStorage.getItem('pollId'), mcq: mcq, text_based: textBased
        }).then(res => {
            console.log("sending change desc request")
            console.log(res);
        }).catch(err => console.log(err.message))
    }


    async function changeName(value) {
        setName(value.value)

        await axios.post(url, {
            // 'admin' : localStorage.getItem('adminId'),
            poll_name: value.value,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            console.log("sending change name request")
            console.log(res);
        }).catch(err => console.log(err.message))
    }

    async function changeDesc(value) {
        setDescription(value.value)
        await axios.post(url, {
            // 'admin' : localStorage.getItem('adminId'),
            description: value.value,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log("sending request")
            console.log(res);
        }).catch(err => console.log(err.message))
    }

    function rename(text, index) {
        questions[index].statement = text
        getIfEmpty(questions)
        setMcq(getMCQ(questions))
        setTextBased(getTextBased(questions))
        setIsChanged(true)
        return questions[index]
    }


    function switchHandler(text, index, type) {
        if (index === undefined) {
            return
        }
        if (questions[index].type !== type) {
            if (questions[index].type === "MCQ") {
                questions[index] = new TextBased(text)
            } else {
                questions[index] = new MCQ(text)
            }
        }
        getIfEmpty(questions)
        setMcq(getMCQ(questions))
        setTextBased(getTextBased(questions))
        setIsChanged(true)
        return questions[index]
    }

    function addOption(index, option) {
        if (questions[index].type === "MCQ") {
            questions[index].options = ([...questions[index].options, new Option(option, questions[index].number)])
        }
        getIfEmpty(questions)
        setMcq(getMCQ(questions))
        setTextBased(getTextBased(questions))
        setIsChanged(true)
        return questions[index]
    }

    function renameOption(index, optionIndex, text) {
        if (questions[index].type === "MCQ") {
            questions[index].options[optionIndex].text = text
        }
        getIfEmpty(questions)
        setMcq(getMCQ(questions))
        setTextBased(getTextBased(questions))
        setIsChanged(true)
        return questions[index].options[optionIndex]
    }

    function deleteOption(questionIndex, optionIndex) {
        if (questions[questionIndex].type === "MCQ") {
            questions[questionIndex].options = questions[questionIndex].options.filter(option => {
                return questions[questionIndex].options.indexOf(option) !== optionIndex
            })
        }
        getIfEmpty(questions)
        setMcq(getMCQ(questions))
        setTextBased(getTextBased(questions))
        setIsChanged(true)
        return questions[questionIndex].options
    }

    function addQuestion() {
        const newQuestions = [...questions, new TextBased()]
        setQuestions([...questions, new TextBased()])
        getIfEmpty(newQuestions)
        setTextBased(getTextBased(newQuestions))
        setMcq(getMCQ(newQuestions))
        setIsChanged(true)
    }


    function deleteQuestion(index) {
        const newQuestions = questions.filter(question => {
            return questions.indexOf(question) !== index
        })
        setQuestions([...newQuestions])
        getIfEmpty(newQuestions)
        setTextBased(getTextBased(newQuestions))
        setMcq(getMCQ(newQuestions))
        setIsChanged(true)
    }


    function getMCQ(questions) {
        const newMcq = []

        questions.forEach(function (item, index) {
            if (item.type === "MCQ") {
                let mcqOptions = [];
                item.options.forEach(function (option, index) {
                    console.log('option.text === ""')
                    console.log(option.text === "")
                    mcqOptions.push(option.text)
                })
                console.log(item.statement);
                console.log(item.statement === "");
                newMcq.push({
                    index: index, statement: item.statement, options: mcqOptions,
                })
            }
        });
        dispatch({
            type: 'SET_IS_CHANGED',
            changed: true,
        })
        console.log("newMcq");
        console.log(newMcq);
        return newMcq
    }

    function getTextBased(questions) {
        const newTextBased = []
        questions.forEach(function (item, index) {
            if (item.type === "TextBased") {
                console.log(item.statement);
                console.log(item.statement === "");
                newTextBased.push({index: index, statement: item.statement})
            }
        });
        dispatch({
            type: 'SET_IS_CHANGED',
            changed: true,
        })
        console.log("newTextBased");
        console.log(newTextBased);
        return newTextBased
    }

    function getIfEmpty(questions){
        setIsOptionEmpty(false)
        setIsQuestionEmpty(false)
        questions.forEach(function (item, index) {
            if (item.statement === "") setIsQuestionEmpty(true)
            if (item.type === "MCQ") {
                item.options.forEach(function (option, index) {
                    if (option.text === "") setIsOptionEmpty(true)
                })
                }
            })
        }

    function fetchQuestions(mcq, textBased) {
        const newQuestions = []
        mcq.forEach(m => {
            const newOptions = []
            m.options.forEach(o => {
                newOptions.push(
                    new Option(o)
                )
            })
            newQuestions[m.index] = new MCQ(m.statement, newOptions)
        })

        textBased.forEach(t => {
            newQuestions[t.index] = new TextBased(t.statement)
        })

        return newQuestions
    }


    // function getJson() {
    //     let mcq = [];
    //     let textBased = [];
    //     questions.forEach(function (item, index) {
    //         if (item.type === "MCQ") {
    //             let mcqOptions = [];
    //             item.options.forEach(function (option, index) {
    //                 mcqOptions.push(option.text)
    //             })
    //             mcq.push({
    //                 statement: item.statement, options: mcqOptions,
    //             })
    //         } else {
    //             textBased.push(item.statement,)
    //         }
    //     });
    //     setData({
    //         mcq: mcq, text_based: textBased,
    //     })
    // }

    // useEffect(() => {
    //     return () => {
    //         questions.forEach(function (item, index) {
    //             if (item.type === "MCQ") {
    //                 let mcqOptions = [];
    //                 item.options.forEach(function (option, index) {
    //                     mcqOptions.push(option.text)
    //                 })
    //                 const newMcq = [...mcq, {
    //                     statement: item.statement, options: mcqOptions,
    //                 }]
    //                 setMcq(newMcq)
    //             } else if (item.type === "TextBased") {
    //                 const newTextBased = [...textBased, item.statement]
    //                 setTextBased(newTextBased)
    //             }
    //         });
    //     };
    // }, [questions]);


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
    // }, [questions]);

    // useEffect(() => {
    //     return () => {
    //         Axios.post(url, {
    //
    //             "data":"helloo",
    //
    //         }).then(
    //             res => {
    //                 res.data
    //             }
    //         )
    //     }
    // }, [question]);


    // useEffect(() => {
    //     return () => {
    //         effect
    //     };
    // }, [mcq,textBased]);


    return (<div>
        {!isPublished && <span className={"floating-action"}>
                <Plus onClick={addQuestion} color={"#085B91"} strokeWidth={"4"} size={"24"}/>
            </span>}

        {loading && questions.length > 0 &&
            <div style={{"paddingTop": "41px"}}><Puff height={"150px"} transform={"scale(2)"} stroke="#085B91"
                                                      strokeOpacity={.125} speed={.75}/></div>}
        {/*<button onClick={onSubmit}> test submit</button>*/}

        <animated.div style={{
            overflow: "hidden", width: "100%", ...style
        }}>
            <div ref={ref} className={!isPublished ? "poll-header" : "poll-header read-only"}>
                {!loading && <form>
                    <EditText required defaultValue={name} placeholder={"Poll Name"} onSave={changeName}
                              className={"poll-name"} readonly={isPublished}/>
                    <EditText required defaultValue={description} placeholder={"Poll Description"} onSave={changeDesc}
                              className={"poll-desc"} readonly={isPublished}/>
                </form>}
                {!loading && questions.length > 0 && questions.map((question) => (
                    <Question key={question.id} onAddOption={addOption} onDeleteOption={deleteOption}
                              onRenameOption={renameOption}
                              onDelete={deleteQuestion} id={questions.indexOf(question)} question={question}
                              rename={rename}
                              switch={switchHandler} published={isPublished}/>))}
            </div>
        </animated.div>
    </div>);
}

export default QuestionsTab;