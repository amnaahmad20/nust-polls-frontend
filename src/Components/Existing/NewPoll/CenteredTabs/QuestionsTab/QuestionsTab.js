import React, {useEffect, useRef, useState} from 'react';
import {Plus} from 'lucide-react'
import './QuestionsTab.css'
import {EditText} from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import Question from "./Question/Question";
import {v4 as uuid} from 'uuid';
import {animated, useSpring} from "react-spring";
import useMeasure from 'react-use-measure'

class MCQ {


    constructor(statement = "Untitled Question") {
        this.optionNumber = 2
        this.id = uuid();
        this.type = "MCQ"
        this.statement = statement
        this.options = [new Option("Option",1)]
    }

    get number() {
        return this.optionNumber++;
    }


}

class Option {
    constructor(text = "Option",optionNumber) {
        this.id = uuid()
        this.text = text + " " + (optionNumber)
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

    const questionsList = new Questions()

    const [name, setName] = useState("");

    const [description, setDescription] = useState("");


    function changeName(value) {
        setName(value.value)
    }


    const [questions, setQuestions] = useState(questionsList.questions);


    function rename(text, index) {
        questions[index].statement = text
        return questions[index]
    }


    function switchHandler(text, index, type) {
        if (index === undefined) {
            return
        }
        if (questions[index].type !== type) {
            questions[index].type === "MCQ" ? questions[index] = new TextBased(text) : questions[index] = new MCQ(text)
        }
        return questions[index]
    }

    function addOption(index, option) {
        if (questions[index].type === "MCQ") {
            questions[index].options = ([...questions[index].options,new Option(option,questions[index].number)])
        }
        return questions[index]
    }

    function deleteOption(questionIndex, optionIndex) {
        if (questions[questionIndex].type === "MCQ") {
            questions[questionIndex].options = questions[questionIndex].options.filter(option => {
                return questions[questionIndex].options.indexOf(option) !== optionIndex
            })
        }

        return questions[questionIndex].options
    }

    function addQuestion() {
        setQuestions([...questions, new TextBased()])
    }

    function deleteQuestion(index) {
        const newQuestions = questions.filter(question => {
            return questions.indexOf(question) !== index
        })
        setQuestions([...newQuestions])
    }

    const ref = useRef(null);
    const [style, animate] = useSpring(() => ({ height: "0px" }), []);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        animate({
            height: ( ref.current.offsetHeight : 0) + "px"
        });
    }, [animate, ref, toggle]);

    useEffect(() => {
        setTimeout(() => setToggle(!toggle), 0);
    }, [toggle, setToggle]);



    return (<div  >
            <span  className={"floating-action"}>
                <Plus onClick={addQuestion} color={"#085B91"} strokeWidth={"4"} size={"24"}/>
            </span>

        <animated.div style={{
            overflow: "hidden",
            width: "100%",
            ...style
        }} >
            <div ref={ref} className={"poll-header"} >
            <form>
            <EditText required defaultValue={name} placeholder={"Poll Name"} onSave={changeName} className={"poll-name"}/>
            <EditText required defaultValue={description} placeholder={"Poll Description"} className={"poll-desc"}/>
            </form>
            {questions.length > 0 && questions.map((question) => (
                <Question key={question.id} onAddOption={addOption} onDeleteOption={deleteOption}
                          onDelete={deleteQuestion} id={questions.indexOf(question)} question={question} rename={rename}
                          switch={switchHandler}/>))}
            </div>
        </animated.div>
    </div>);
}

export default QuestionsTab;