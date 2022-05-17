import React, {useEffect, useState} from 'react';
import Main from './Main';
import Nav from './Components/Nav/Nav';
import Dashboard from './Components/Dashboard/Dashboard';
import './css/App.css';
import {Route, Routes, useLocation} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePolls from './Components/Creation/CreatePolls';
import ExistingPolls from './Components/Existing/ExistingPolls';
import jwtDecode from 'jwt-decode';
import ForgotPassword from './Components/Forms/ForgotPassword';
import ResetPassword from './Components/Forms/ResetPassword';
import PollCreationNav from "./Components/Nav/PollCreationNav";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            const {iat, ...decoded} = jwtDecode(token);
            setIsLoggedIn(true);
            setName(`${decoded.firstName} ${decoded.lastName}`);
        }
    }, [location]);

    return (<div className="App">
        <ToastContainer position="bottom-right"/>
        <Routes>
            <Route
                path="/"
                element={<div className="App">
                    <Nav/>
                    <Main/>
                </div>}
            />
            <Route
                path="/login"
                element={<div className="App">
                    <Nav/>
                    <Main/>
                </div>}
            />
            <Route
                path="/forgotpassword"
                element={<div className="App">
                    <Nav/>
                    <ForgotPassword/>
                </div>}
            />
            <Route
                path="/resetpassword/:resetToken"
                element={<div className="App">
                    <Nav/>
                    <ResetPassword/>
                </div>}
            />
            <Route
                path="/student"
                element={<div className="App">
                    <h1>Welcome</h1>
                </div>}
            />
            <Route
                path="/dash"
                element={<div className="App">
                    <Nav isLoggedIn={isLoggedIn}/>
                    <Dashboard/>
                </div>}
            />
            <Route
                path="/create-poll"
                element={<div className="App">
                    <PollCreationNav />
                    <CreatePolls/>
                </div>}
            />
            <Route
                path="/view-polls"
                element={<div className="App">
                    <Nav isLoggedIn={isLoggedIn}/>
                    <ExistingPolls name={name}/>
                </div>}
            />
        </Routes>
    </div>);
}

export default App;
