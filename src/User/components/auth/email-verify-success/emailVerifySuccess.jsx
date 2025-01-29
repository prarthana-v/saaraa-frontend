import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const apiurl = import.meta.env.VITE_API_URL
import axios from 'axios';

const EmailVerificationSuccess = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(
        `${apiurl}/auth/verify-otp`,
        { otp },
        { withCredentials: true } // To send cookies with the request
      );
      console.log(response, 'rs')
      if (response.status === 200) {
        setMessage('OTP verified successfully!');
        navigate('/password/reset'); // Redirect to reset password
      }
    } catch (error) {
      console.log(error, 'otp verification')
      if (error?.response && error?.response?.data?.message) {
        setMessage(error?.response?.data?.message);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body py-5">
      <div className="container">
        <div className="row  d-flex  justify-content-evenly align-items-center py-5">
          <div className="col-5 d-flex justify-content-center">
            <div className="col-12 shadow pb-8 px-8" style={{ borderRadius: '12px' }}>
              <div className="text-center flex-col align-center">
                <h1 className="playfair pb-3 mt-5">Verify OTP</h1>
                <p className="poppins">Your email has been verified. Please enter the OTP sent to your email to proceed.</p>

                {/* OTP Input Form */}
                <form onSubmit={handleVerifyOtp} className="my-4">
                  <div className='form-group'>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      required
                      className="w-75 rounded-pill ps-4 mb-3"
                    />
                  </div>
                  <button
                    type="submit"
                    className={`btn text-white montserrat border btn-dark rounded-pill w-75 px-8 py-3 ${loading ? 'loading' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </form>

                {/* Feedback Message */}
                {message && <p className="py-2 text-danger">{message}</p>}

                <Link to="/login" className="btn btn-link">Back to Login</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div >
  );
};

export default EmailVerificationSuccess;
