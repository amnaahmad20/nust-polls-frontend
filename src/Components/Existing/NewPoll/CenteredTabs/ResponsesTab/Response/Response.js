import React from 'react';
import './Response.css';

const Response = (props) => {
  return (
    <div className="response">
      <p className="response-answer">
        <span>{props.username}</span>
        {props.answer}
      </p>
    </div>
  );
};

export default Response;
