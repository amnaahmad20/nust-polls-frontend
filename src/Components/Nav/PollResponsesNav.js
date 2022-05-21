import React, { useEffect, useRef, useState } from 'react';
import pollsLogo from '../../img/logo.svg';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { toast } from 'react-toastify';
import { Puff } from 'react-loading-icons';

const PollResponsesNav = (props) => {
  const navigate = useNavigate();

  function backHandler() {
    //to do
    navigate(-1);
  }

  function homeHandler() {
    navigate('/dash');
  }

  const printHandler = () => {
    //to do
    console.log('Print');
  };

  return (
    <div className="nav">
      <div>
        <ChevronLeft
          className={'back-arrow'}
          color={'#085B91'}
          size={40}
          onClick={backHandler}
        />
        <img src={pollsLogo} onClick={homeHandler} alt="logo" />
      </div>
      <button className="logout reg-button" onClick={printHandler}>
        Print
      </button>
    </div>
  );
};

export default PollResponsesNav;
