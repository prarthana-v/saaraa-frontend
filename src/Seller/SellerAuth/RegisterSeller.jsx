import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// import { registerSeller } from '../../../State/Redux/Slices/';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { sellerRegister } from '../../State/SellerAuthSlice';


const SellerRegister = () => {
  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // State for form data
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const resultAction = await dispatch(sellerRegister(formData));
      console.log();

      if (resultAction.payload.success === true) {
        toast.success('Registration successful!');
        navigate('/seller/register/buisness');
      } else {
        toast.error(resultAction.payload?.error || 'Registration failed!');
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
    }
  };


  return (
    <>
      <div className="">
        <div className="container">
          <div className="row d-flex justify-content-center mt-5">
            <div className="col-6">
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg p-8 rounded-md"
              >
                {/* {isLoading && <p>Loading...</p>} */}
                {/* {error && <p className="text-red-500">{error}</p>} */}
                <p className='mb-0 poppins font-normal fs-16 pb-2 text-center text-black '>Welcome to Saaraa Trends </p>
                <h4 className='poppins font-semibold text-black mb-5' align="center" >
                  Create Your Seller Account
                </h4>
                <Grid container spacing={2}>
                  <Grid item xs={12} >
                    <TextField
                      fullWidth
                      required
                      label="Userame"
                      name="username"
                      variant="outlined"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      required
                      label="Phone Number"
                      name="phone"
                      variant="outlined"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      required
                      label="Email"
                      name="email"
                      variant="outlined"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      required
                      label="Password"
                      name="password"
                      type="password"
                      variant="outlined"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      required
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      variant="outlined"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      className="bg-green-500 text-white mt-4"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Registering...' : 'Create an Account'}
                    </Button>
                  </Grid>

                  <Grid item xs={12} className='text-center'>
                    <p className='text-center font-normal fs-15 mt-2'>Already Have a Seller Account?</p>

                    <Link to={'/seller/login'} className='text-black fw-500 roboto'>
                      <button className="btn bg-none  underline border-dark">
                        <span className='underline'>Login</span>
                      </button>
                    </Link>
                  </Grid>

                </Grid>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerRegister;
