import React, { useState, useEffect, useRef } from 'react';
import './ResponseTab.css';
import Question from '../QuestionsTab/Question/Question';
import DoughnutChart from '../../../../Charts/DoughnutChart/DoughnutChart';
import BarChart from '../../../../Charts/BarChart/BarChart';
import Response from './Response/Response';
import axios from '../../../../../axios';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
// import { useStateValue } from '../../../../../StateProvider';

let pdfPrintHandler;

function ResponseTab(props) {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const printRef = useRef();
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

  pdfPrintHandler = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    let heightLeft = pdfHeight;
    let position = 10;

    pdf.addImage(data, 'PNG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position += heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(data, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }
    pdf.save('Report.pdf');
  };

  return (
    <div>
      <div className={'responses'} ref={printRef}>
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
    </div>
  );
}

export { pdfPrintHandler };
export default ResponseTab;
