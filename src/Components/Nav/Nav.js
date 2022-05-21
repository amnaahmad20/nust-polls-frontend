import React from 'react';
import './nav.css';
import pollsLogo from '../../img/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';

function Nav() {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    dispatch({
      type: 'SET_USER',
      user: null,
    });
    navigate('/login');
  };

  function homeHandler() {
    //to do
    navigate('/dash');
  }


  return (
    <div className="nav">
      <img src={pollsLogo} onClick={homeHandler} alt="logo" />
      {user && (
        <button className="logout reg-button" onClick={logoutHandler}>
          Log Out
        </button>
      )}
    </div>
  );
}

export default Nav;
