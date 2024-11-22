import React from 'react';
import { Link } from 'react-router-dom';

const EmailVerificationSuccess = () => {
  return (
    <div className="body py-5 ">
      <div className="container">
        <div className="row">
          <div className='text-center'>
            <img src="logo/saraa-trends-bg.png" width={150} height={150} alt="" />
            <h1 className='playfair pb-3 mt-5'>Email Verification Successful</h1>
            <p className='poppins'>Your email has been verified. You can now reset your password.</p>
            <Link to="/password/reset" className='btn border btn-dark rounded-pill px-4 py-3'>Reset Password</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationSuccess;
