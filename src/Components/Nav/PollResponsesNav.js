import React from 'react';
import pollsLogo from '../../img/logo.svg';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { element } from '../Existing/NewPoll/CenteredTabs/ResponsesTab/ResponseTab';
import { toast } from 'react-toastify';
import html2pdf from 'html2pdf.js';

const PollResponsesNav = (props) => {
  const navigate = useNavigate();

  function backHandler() {
    //to do
    navigate(-1);
  }

  function homeHandler() {
    navigate('/dash');
  }

  const pdfPrintHandler = async () => {
    const opt = {
      margin: [10, 0],
      filename: 'Report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { format: 'a3', orientation: 'p' },
      pagebreak: { avoid: ['canvas', 'p'] },
    };

    try {
      await html2pdf().set(opt).from(element).save();
      toast.success('PDF download successful');
    } catch (err) {
      toast.error('Error downloading PDF');
    }
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
      <button className="logout reg-button" onClick={pdfPrintHandler}>
        Print
      </button>
    </div>
  );
};

export default PollResponsesNav;
