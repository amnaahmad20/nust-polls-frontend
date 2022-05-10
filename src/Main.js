import React, { useState } from 'react';
import './css/main.css';
import eye from './img/eye.png';
import axios from './axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Main() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputType, setInputType] = useState('password');
  const navigate = useNavigate();

  const showPassword = () => {
    inputType === 'password' ? setInputType('text') : setInputType('password');
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/login', { username, password });
      toast.success(res.data.message);
      localStorage.setItem('token', res.data.token);
      setUsername('');
      setPassword('');
      res.data.data.admin ? navigate('/dash') : navigate('/student');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <section className="sign-in d-flex justify-content-center align-items-center">
      <div className="sign-in-box text-center mx-4">
        <h2>Sign in</h2>
        <form onSubmit={loginHandler}>
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Enter username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="password">
            <input
              type={inputType}
              className="form-control"
              name="password"
              placeholder="Enter password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="eye">
              <img
                className="img-fluid"
                onClick={showPassword}
                src={eye}
                alt="show"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-dark dark-button">
            Sign In
          </button>
          <a
            style={{
              display: 'block',
              cursor: 'pointer',
              marginTop: '10px',
              color: '#063651',
              textDecoration: 'underline',
            }}
            href="#"
          >
            Forgot Password?
          </a>
        </form>
      </div>
    </section>
  );
}

export default Main;
