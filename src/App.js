import React, { useState, useEffect } from 'react';
import Main from './Main';
import Nav from './Components/Nav/Nav';
import Dashboard from './Components/Dashboard/Dashboard';
import './css/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePolls from './Components/Creation/CreatePolls';
import ExistingPolls from './Components/Existing/ExistingPolls';
import jwtDecode from 'jwt-decode';
import ForgotPassword from './Components/Forms/ForgotPassword';
import ResetPassword from './Components/Forms/ResetPassword';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const { iat, ...decoded } = jwtDecode(token);
      setIsLoggedIn(true);
      setName(`${decoded.firstName} ${decoded.lastName}`);
    }
  }, []);

  return (
    <div className="App">
      <ToastContainer position="bottom-right" />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="App">
                <Nav />
                <Main />
              </div>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <div className="App">
                <Nav />
                <Main />
              </div>
            }
          ></Route>
          <Route
            path="/forgotpassword"
            element={
              <div className="App">
                <Nav />
                <ForgotPassword />
              </div>
            }
          ></Route>
          <Route
            path="/resetpassword/:resetToken"
            element={
              <div className="App">
                <Nav />
                <ResetPassword />
              </div>
            }
          ></Route>
          <Route
            path="/student"
            element={
              <div className="App">
                <h1>Welcome</h1>
              </div>
            }
          ></Route>
          <Route
            path="/dash"
            element={
              <div className="App">
                <Nav isLoggedIn={isLoggedIn} />
                <Dashboard />
              </div>
            }
          ></Route>
          <Route
            path="/create-poll"
            element={
              <div className="App">
                <Nav isLoggedIn={isLoggedIn} />
                <CreatePolls />
              </div>
            }
          ></Route>
          <Route
            path="/view-polls"
            element={
              <div className="App">
                <Nav isLoggedIn={isLoggedIn} />
                <ExistingPolls name={name} />
              </div>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
