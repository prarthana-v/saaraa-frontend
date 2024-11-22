import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import './ResetPassword.css';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    console.log(newPassword, confirmPassword);

    setError('');
    setMessage('')

    if (newPassword !== confirmPassword) {
      setError('passwords do not match')
    }
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/reset-password`, { newPassword }, {
        withCredentials: true, // Include cookies in the request
      });
      setMessage(response.data.message);
      navigate('/login'); // Redirect to login after password reset
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="body">
      <div className="container ">
        <div className="row d-flex justify-content-center align-items-center pt-5">
          <div className="col-md-8 col-lg-6 col-xl-4">
            <div className="reset-password-card">
              <h2 className='poppins'>Reset Your Password</h2>
              <p className="roboto fs-15 pt-1 pb-3 px-2">Enter a new password and confirm it below.</p>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {message && <p style={{ color: 'green' }}>{message}</p>}

              <form onSubmit={handleResetPassword}>
                <div className="form-group">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    required
                    className='rounded-pill ps-4'
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    className='rounded-pill ps-4'
                  />
                </div>
                <button type="submit" className='reset-btn rounded-pill'>Reset Password</button>
              </form>

              <p className="back-to-login"><Link to={"/login"}>Back to Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
