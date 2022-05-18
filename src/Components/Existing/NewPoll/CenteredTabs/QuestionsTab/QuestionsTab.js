import React, {useEffect, useRef, useState} from 'react';
import {Plus} from 'lucide-react'
import './QuestionsTab.css'
import {EditText} from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import Question from "./Question/Question";
import {v4 as uuid} from 'uuid';
import {animated, useSpring} from "react-spring";
import axios from "axios";

class MCQ {


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


}

class Option {
    constructor(text = "Option", optionNumber) {
        this.id = uuid()
        optionNumber ? this.text = text + " " + (optionNumber) : this.text = text
    }
}

class TextBased {
    constructor(statement = "") {
        this.id = uuid()
        this.type = "TextBased"
        this.statement = statement
    }


}

class Questions {
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

    const [textBased, setTextBased] = useState(questions[0]?[questions[0].statement]:[]);

    const [isChanged, setIsChanged] = useState(false);

    const [isPublished, setIsPublished] = useState(false);

    const mcqRef = useRef(mcq);
    mcqRef.current = mcq;

    const textBasedRef = useRef(textBased);
    textBasedRef.current = textBased;

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

    const url = 'http://localhost:9000/polls/edit/' + localStorage.getItem('pollId');
    const fetchUrl = 'http://localhost:9000/polls/ques/' + localStorage.getItem('pollId');
    const editQuestionUrl = 'http://localhost:9000/polls/edit-ques/' + localStorage.getItem('questionsId');

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
                        setName(response.data.poll_name)
                        setDescription(response.data.description)
                        setQuestions(fetchQuestions(response.data.questions[0].mcq?response.data.questions[0].mcq:[], response.data.questions[0].text_based?response.data.questions[0].text_based:[]))
                    });
                } catch (error) {
                    console.error(error);
                }
                setLoading(false);
            };
            // if(isCreated) {
                fetchData();
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
                    poll: localStorage.getItem('pollId'), mcq: mcqRef.current, text_based: textBasedRef.current
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                }).then(res => {
                    console.log("sending request")
                    console.log(res);
                    // if (!isCreated) setIsCreated(true)
                    setIsChanged(false)
                }).catch(err => console.log(err.message))
            }, 2000);
            return () => clearTimeout(timer);
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
        if (questions[index].type === "MCQ") {
            setMcq(getMCQ(questions))
        } else {
            setTextBased(getTextBased(questions))
        }
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
        setMcq(getMCQ(questions))
        setTextBased(getTextBased(questions))
        setIsChanged(true)
        return questions[index]
    }

    function addOption(index, option) {
        if (questions[index].type === "MCQ") {
            questions[index].options = ([...questions[index].options, new Option(option, questions[index].number)])
        }
        setMcq(getMCQ(questions))
        setTextBased(getTextBased(questions))
        setIsChanged(true)
        return questions[index]
    }

    function renameOption(index, optionIndex,text) {
        if (questions[index].type === "MCQ") {
            questions[index].options[optionIndex].text = text
        }
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
        setMcq(getMCQ(questions))
        setTextBased(getTextBased(questions))
        setIsChanged(true)
        return questions[questionIndex].options
    }

    function addQuestion() {
        const newQuestions = [...questions, new TextBased()]
        setQuestions([...questions, new TextBased()])
        setTextBased(getTextBased(newQuestions))
        setMcq(getMCQ(newQuestions))
        setIsChanged(true)
    }


    function deleteQuestion(index) {
        const newQuestions = questions.filter(question => {
            return questions.indexOf(question) !== index
        })
        setQuestions([...newQuestions])
        setTextBased(getTextBased(newQuestions))
        setMcq(getMCQ(newQuestions))
        setIsChanged(true)
    }


    function getMCQ(questions) {
        const newMcq = []
        console.log(questions);
        questions.forEach(function (item, index) {
            if (item.type === "MCQ") {
                let mcqOptions = [];
                item.options.forEach(function (option, index) {
                    mcqOptions.push(option.text)
                })
                newMcq.push({
                    index: index, statement: item.statement, options: mcqOptions,
                })
            }
        });
        console.log("newMcq");
        console.log(newMcq);
        return newMcq
    }

    function getTextBased(questions) {
        const newTextBased = []
        console.log(questions);
        questions.forEach(function (item, index) {
            if (item.type === "TextBased") {
                newTextBased.push({index: index, statement: item.statement})
            }
        });
        console.log("newTextBased");
        console.log(newTextBased);
        return newTextBased
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


        {/*<button onClick={onSubmit}> test submit</button>*/}

        <animated.div style={{
            overflow: "hidden", width: "100%", ...style
        }}>
            <div ref={ref} className={!isPublished? "poll-header" : "poll-header read-only" }>
                <form>
                    <EditText required defaultValue={name} placeholder={"Poll Name"} onSave={changeName}
                              className={"poll-name"} readonly={isPublished}/>
                    <EditText required defaultValue={description} placeholder={"Poll Description"} onSave={changeDesc}
                              className={"poll-desc"} readonly={isPublished}/>
                </form>
                {questions.length > 0 && questions.map((question) => (
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