import React, { useState } from 'react';
import '../../css/main.css';
import eye from '../../img/eye.png';
import axios from '../../axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const { resetToken } = useParams();
  const [inputType, setInputType] = useState('password');
  const navigate = useNavigate();

  const showPassword = () => {
    inputType === 'password' ? setInputType('text') : setInputType('password');
  };

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/user/resetpassword/${resetToken}`, {
        password,
      });
      toast.success(res.data.message);
      setPassword('');
      navigate('/login');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <section className="sign-in d-flex justify-content-center align-items-center">
      <div className="sign-in-box text-center mx-4">
        <h2>Reset Password</h2>
        <form onSubmit={resetPasswordHandler}>
          <div className="password">
            <input
              type={inputType}
              className="form-control"
              name="password"
              placeholder="Enter password"
              id="password"
              value={password}
              minLength="8"
              onChange={(e) => setPassword(e.target.value)}
              required
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
            Reset
          </button>
        </form>
      </div>
    </section>
  );
}

export default ResetPassword;
