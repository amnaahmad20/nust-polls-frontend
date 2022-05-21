import React, {useEffect, useState} from 'react';
import Main from './Main';
import Nav from './Components/Nav/Nav';
import Dashboard from './Components/Dashboard/Dashboard';
import './css/App.css';
import {ToastContainer} from 'react-toastify';
import './css/App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import CreatePolls from './Components/Creation/CreatePolls';
import ExistingPolls from './Components/Existing/ExistingPolls';
import ForgotPassword from './Components/Forms/ForgotPassword';
import ResetPassword from './Components/Forms/ResetPassword';
import { useStateValue } from './StateProvider';
import EditPoll from "./Components/Existing/EditPoll/EditPoll";
import PollCreationNav from "./Components/Nav/PollCreationNav";
import StudentDashBoard from "./Components/StudentDashBoard/StudentDashBoard";
import SubmitPoll from "./Components/StudentDashBoard/StudentPoll/SubmitPoll/SubmitPoll";
import PollSubmissionNav from "./Components/Nav/PollSubmissionNav";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const { iat, ...decoded } = jwtDecode(token);
      dispatch({
        type: 'SET_USER',
        user: decoded,
      });
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
              <Nav  />
              <StudentDashBoard/>
              </div>
            }
          ></Route>
          <Route
            path="/dash"
            element={
              <div className="App">
                <Nav />
                <Dashboard />
              </div>
            }
          ></Route>
          <Route
            path="/create-poll"
            element={
              <div className="App">
                <PollCreationNav />
                <CreatePolls />
              </div>
            }
          ></Route>
            <Route
                path="/submit-poll"
                element={
                    <div className="App">
                        <PollSubmissionNav />
                        <SubmitPoll />
                    </div>
                }
            ></Route>
            <Route
                path="/edit-poll"
                element={
                    <div className="App">
                        <PollCreationNav />
                        <EditPoll />
                    </div>
                }
            ></Route>
          <Route
            path="/view-polls"
            element={
              <div className="App">
                <Nav />
                <ExistingPolls />
              </div>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
