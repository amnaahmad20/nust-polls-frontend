import Main from './Main';
import Nav from "./Nav";
import Nav2 from './Nav2';
import Dashboard from './Dashboard';
import "./css/App.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {

 return (
    <div className='App'>
     


     <Router>
       <Routes>
         <Route path="/" element={
           <div className='App'>
             <Nav />
             <Main />
           </div>
         }>
         </Route>

       <Route path="/dash" element={
         <div className='App'>
           <Nav2 />
           <Dashboard />
         </div>
       }>    
       </Route>
       </Routes>
     </Router>
     

    </div>
  );
}

export default App;
