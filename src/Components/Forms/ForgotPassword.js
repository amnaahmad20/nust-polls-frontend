import React, { useState } from 'react';
import '../../css/main.css';
import axios from '../../axios';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/forgotpassword', { email });
      toast.success(res.data.message);
      setEmail('');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <section className="sign-in d-flex justify-content-center align-items-center">
      <div className="sign-in-box text-center mx-4">
        <h2>Forgot Password</h2>
        <form onSubmit={forgotPasswordHandler}>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-dark dark-button">
            Send Email
          </button>
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;
