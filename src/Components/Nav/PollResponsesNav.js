import React from 'react';
import pollsLogo from '../../img/logo.svg';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { pdfPrintHandler } from '../Existing/NewPoll/CenteredTabs/ResponsesTab/ResponseTab';

const PollResponsesNav = (props) => {
  const navigate = useNavigate();

  function backHandler() {
    //to do
    navigate(-1);
  }

  function homeHandler() {
    navigate('/dash');
  }

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
      <button className="logout reg-button" onClick={pdfPrintHandler}>
        Print
      </button>
    </div>
  );
};

export default PollResponsesNav;
