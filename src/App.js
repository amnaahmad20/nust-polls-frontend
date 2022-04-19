import React from 'react';
import Main from './Main';
import Nav from "./Components/Nav/Nav";
import Dashboard from './Components/Dashboard/Dashboard';
import "./css/App.css"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CreatePolls from "./Components/Creation/CreatePolls";
import ExistingPolls from "./Components/Existing/ExistingPolls";


function App() {

    return (<div className='App'>
        <Router>
            <Routes>
                <Route path="/" element={<div className='App'>
                    <Nav/>
                    <Main/>
                </div>}>
                </Route>
                <Route path="/dash" element={<div className='App'>
                    <Nav isLoggedIn={true}/>
                    <Dashboard/>
                </div>}>
                </Route>
                <Route path="/create-poll" element={<div className='App'>
                    <Nav isLoggedIn={true}/>
                    <CreatePolls/>
                </div>}>
                </Route>
                <Route path="/view-polls" element={<div className='App'>
                    <Nav isLoggedIn={true}/>
                    <ExistingPolls/>
                </div>}>
                </Route>
            </Routes>
        </Router>
    </div>);
}

export default App;
