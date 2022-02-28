import React from 'react'
import "./css/main.css"
import eye from "./img/eye.png"
import {
    useNavigate,
    Link
  } from "react-router-dom";


function Main() {
    const navigate = useNavigate();

  return (
        <section className="sign-in d-flex justify-content-center align-items-center">
            <div className="sign-in-box text-center mx-4">
                <h2>Sign in</h2>
                <p>Poll Generation Made Easier</p>
                <form action="{{route('auth.check')}}" method="post">
                
                <input type="email" className="form-control" name='email' placeholder="Enter email" id="email" value="" />
                <div className="password">
                    <input type="password" className="form-control" name='password' placeholder="Enter password" id="pwd" />
                    <div className="eye">
                    <img className="img-fluid" onclick="showPassword()" src= {eye} alt="show" />
                    </div>
                </div>


                <button type="submit" onClick={() => navigate("/dash")} class="btn btn-dark" style={{backgroundColor:"#063651"}} component={Link} to="/dash">
                    Sign In
                    </button>
                <a style={{ display:"block", cursor:"pointer", marginTop:"10px", color:"#063651", textDecoration:"underline" }} href='#'>Forgot Password?</a>

                </form>
            </div>
        </section>
  )
}

export default Main