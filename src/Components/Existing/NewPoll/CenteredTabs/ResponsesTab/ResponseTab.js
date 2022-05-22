import React, { useState, useEffect } from 'react';
import './ResponseTab.css';
import Question from '../QuestionsTab/Question/Question';
import DoughnutChart from '../../../../Charts/DoughnutChart/DoughnutChart';
import BarChart from '../../../../Charts/BarChart/BarChart';
import Response from './Response/Response';
import axios from '../../../../../axios';
import { useStateValue } from '../../../../../StateProvider';

function ResponseTab(props) {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  // const [{ responseTab }, dispatch] = useStateValue();

  // const fetchData = async () => {
  //   try {
  //     const res = await axios.get(
  //       `/polls/details/${localStorage.getItem('pollId')}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );
  //     console.log(res.data);
  //     const sortByIndex = (a, b) => {
  //       return a.index - b.index;
  //     };
  //     setQuestions(
  //       [...res.data.questions.mcq, ...res.data.questions.text_based].sort(
  //         sortByIndex
  //       )
  //     );
  //     setResponses(
  //       [...res.data.responses.mcq, ...res.data.responses.text_based].sort(
  //         sortByIndex
  //       )
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   const intervalCall = setInterval(() => {
  //     fetchData();
  //   }, 2000);
  //   return () => {
  //     clearInterval(intervalCall);
  //   };
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/polls/details/${localStorage.getItem('pollId')}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(res.data);
        const sortByIndex = (a, b) => {
          return a.index - b.index;
        };
        setQuestions(
          [...res.data.questions.mcq, ...res.data.questions.text_based].sort(
            sortByIndex
          )
        );
        setResponses(
          [...res.data.responses.mcq, ...res.data.responses.text_based].sort(
            sortByIndex
          )
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const calculateCount = (options, qIndex) => {
    const count = options.map((option, index) =>
      responses[qIndex]?.responses.reduce(
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
      {questions?.length > 0 &&
        questions?.map((question, qIndex) => (
          <Question
            key={qIndex}
            id={qIndex}
            question={question}
            published={true}
            responseTab={true}
          >
            <div>
              <p className="responses-no">{`${responses[qIndex]?.responses.length} responses`}</p>
              {question?.options ? (
                question?.options.length < 4 ? (
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
                  {responses[qIndex]?.responses.map((response, index) => (
                    <Response
                      key={index}
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
