import React, { useState, useEffect } from 'react';
import './ResponseTab.css';
import Question from '../QuestionsTab/Question/Question';
import DoughnutChart from '../../../../Charts/DoughnutChart/DoughnutChart';
import BarChart from '../../../../Charts/BarChart/BarChart';
import ShortText from '../QuestionsTab/Question/ShortText/ShortText';

function ResponseTab(props) {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    console.log('this is responses section');
    const res = {
      questions: {
        _id: '6251893ba5922ce026818b9a',
        poll: '625183c6a5922ce026818b96',
        mcq: [
          {
            statement: 'Is the hike justified?',
            index: 0,
            options: ['Yes', 'No', 'Maybe', 'Neither'],
          },
          {
            statement:
              'Were you expecting the hike asnnmsdnsa djsakds sdajssssssssssssssssssss?',
            options: ['Yes', 'No'],
            index: 3,
          },
        ],
        text_based: [
          {
            index: 2,
            statement: 'Question 1',
          },
          {
            statement: 'Question 2',
            index: 1,
          },
          {
            statement: 'Question 3',
            index: 4,
          },
        ],
      },
      responses: {
        _id: '6283e33598f8283cb8a504ad',
        poll: '625183c6a5922ce026818b96',
        text_based: [
          {
            index: 2,
            responses: [
              {
                student_id: '6251890f231691cda13f3cea',
                username: 'fmujahid.bese18seecs',
                answer: 'Lorem Ipsum is the answer',
              },
              {
                student_id: '62518a328d6cf528028b4381',
                username: 'fmujahid.bscs20seecs',
                answer: 'We must get it done',
              },
            ],
          },
          {
            index: 1,
            responses: [],
          },
          {
            index: 4,
            responses: [],
          },
        ],
        mcq: [
          {
            index: 0,
            responses: [
              {
                student_id: '6251890f231691cda13f3cea',
                username: 'fmujahid.bese18seecs',
                answer: '0',
              },
              {
                student_id: '62518a328d6cf528028b4381',
                username: 'fmujahid.bscs20seecs',
                answer: '1',
              },
            ],
          },
          {
            index: 3,
            responses: [
              {
                student_id: '6251890f231691cda13f3cea',
                username: 'fmujahid.bese18seecs',
                answer: '1',
              },
              {
                student_id: '62518a328d6cf528028b4381',
                username: 'fmujahid.bscs20seecs',
                answer: '0',
              },
            ],
          },
        ],
      },
    };
    const sortByIndex = (a, b) => {
      return a.index - b.index;
    };
    setQuestions(
      [...res.questions.mcq, ...res.questions.text_based].sort(sortByIndex)
    );
    setResponses(
      [...res.responses.mcq, ...res.responses.text_based].sort(sortByIndex)
    );
    console.log(questions, responses);
  }, []);

  const calculateCount = (options, qIndex) => {
    const count = options.map((option, index) =>
      responses[qIndex].responses.reduce(
        (acc, cur) => (parseInt(cur.answer) === index ? ++acc : acc),
        0
      )
    );

    return count;
  };

  return (
    <div className={'responses'}>
      {/* TODO
      Total no of responses and 0 responses with nothing else in case of no responses */}
      <p className="responses-total">2 responses</p>
      {questions.length > 0 &&
        questions.map((question, qIndex) => (
          <Question
            key={qIndex}
            id={qIndex}
            question={question}
            published={true}
            responseTab={true}
          >
            <div>
              <p className="responses-no">{`${responses[qIndex].responses.length} responses`}</p>
              {question.options ? (
                question.options.length < 3 ? (
                  <DoughnutChart
                    labelSet={question.options}
                    dataSet={calculateCount(question.options, qIndex)}
                  />
                ) : (
                  <BarChart
                    labelSet={question.options}
                    dataSet={calculateCount(question.options, qIndex)}
                  />
                )
              ) : (
                <div>
                  {responses[qIndex].responses.map((response) => (
                    <ShortText
                      answer={response.answer}
                      username={response.username}
                    />
                  ))}
                </div>
              )}
            </div>
          </Question>
        ))}
    </div>
  );
}

export default ResponseTab;
