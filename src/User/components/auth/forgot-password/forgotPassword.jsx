import React from 'react'
import './forgotPassword.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../../styles/universalStyle.css'
const apiurl = import.meta.env.VITE_API_URL
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';


const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  // Function to handle sending OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(email);
    try {
      const response = await axios.post(`${apiurl}/auth/forgotpassword`, { email }, {
        withCredentials: true,
      });

      if (response.data.success) {
        setMessage('Verification email sent! Please check your inbox.');
        setEmail("");
        navigate('/password/verifyotp')
      } else {
        setMessage('Failed to send verification email. Please try again.');
      }
    } catch (error) {
      // If the error is due to a user not found, display that specific message
      if (error.response && error.response.status === 404) {
        setMessage('User not found. Please check the email and try again.');
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false); // Stop loading spinner
    }

  };


  return (
    <>
      <div className="body">
        <div className="container ">
          <div className="row d-flex  justify-content-evenly align-items-center py-5">
            <div className="col-5 d-flex justify-content-center">
              <div className="col-10">
                <div className="forgot-password-card">
                  <h2 className='poppins'>Password Recovery</h2>
                  <p className="roboto fs-15 pt-2 px-4">Enter your registered Email Address and we will send you a verfication Email .</p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                        className='rounded-pill ps-4'
                      />
                    </div>
                    {loading ? (
                      <div className="text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress size={24} />
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className={`button  rounded-pill`} >
                        Send Verification Email
                      </button>
                    )}
                  </form>
                  {message && <p className='py-4'>{message}</p>}
                  <p className="back-to-login"><Link to={"/login"}>Back to Login</Link></p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
