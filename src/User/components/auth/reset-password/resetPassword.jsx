import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const apiurl = import.meta.env.VITE_API_URL;
import './ResetPassword.css';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        `${apiurl}/auth/reset-password`,
        { newPassword },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setMessage('Password Reset successfully!');
        navigate('/login');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="body">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center pt-5">
          <div className="col-md-8 col-lg-6 col-xl-4">
            <div className="reset-password-card">
              <h2 className="poppins">Reset Your Password</h2>
              <p className="roboto fs-15 pt-1 pb-3 px-2">
                Enter a new password and confirm it below.
              </p>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {message && <p style={{ color: 'green' }}>{message}</p>}

              <form onSubmit={handleResetPassword}>
                <div className="form-group position-relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    required
                    className="rounded-pill ps-4"
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                  >
                    {showNewPassword ? <VisibilityOffIcon size={20} /> : <RemoveRedEyeIcon size={20} />}
                  </span>
                </div>
                <div className="form-group position-relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    className="rounded-pill ps-4"
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? <VisibilityOffIcon size={20} /> : <RemoveRedEyeIcon size={20} />}
                  </span>
                </div>
                <button type="submit" className="reset-btn rounded-pill">
                  Reset Password
                </button>
              </form>

              <p className="back-to-login">
                <Link to="/login">Back to Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
