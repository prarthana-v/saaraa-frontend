// SellerLogin.jsx
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { login } from '../../State/SellerAuthSlice';
import { useEffect } from 'react';
import axios from 'axios';

const SellerLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { loading, error } = useSelector((state) => state.auth);
  const apiurl = import.meta.env.VITE_API_URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    let response = await dispatch(login(formData));
    console.log('data', response);
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${apiurl}/seller/check-auth`, {
          withCredentials: true, // Ensure cookies are sent
        });

        if (response.data.success === true) {
          navigate('/seller');
        } else {
          setIsAuthenticated(false); // Seller not logged in
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false); // Error handling if auth fails
      }
    };
    checkAuth();
  };



  return (
    <>
      <div className="">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-12 ">
              <Grid container justifyContent="center" alignItems="center" className='' style={{ minHeight: '100vh' }}>
                <Grid item xs={10} sm={6} md={4} className='form-container shadow-lg p-9'>
                  <form className='' onSubmit={handleSubmit}>
                    <p className='mb-0 poppins font-normal fs-16 pb-2 text-center text-black '>Welcome to Saaraa Trends </p>
                    <h4 className='poppins font-semibold text-black mb-5' align="center" >
                      Login to Your Seller Account
                    </h4>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          label="Email"
                          variant="outlined"
                          fullWidth
                          name="email"
                          value={formData.email || ""}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Password"
                          type="password"
                          variant="outlined"
                          fullWidth
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Link className='text-black fw-500 roboto'>Forgot Password?</Link>
                      </Grid>
                      <Grid item xs={12}>
                        {loading ? (
                          <>
                            <div className='text-center'>
                              <CircularProgress />
                            </div>
                          </>
                        ) : (
                          <Button variant="contained" color="primary" fullWidth type="submit">
                            Login
                          </Button>
                        )}
                      </Grid>
                      {error && (
                        <Grid item xs={12}>
                          <Typography color="error">{error || "An error occurred"}</Typography>
                        </Grid>
                      )}

                    </Grid>

                  </form>

                  <Grid item xs={12} className='text-center'>
                    <p className='text-center font-normal fs-15 mt-5'>New to Saaraa Trends?</p>

                    <Link to={'/seller/register'} className='text-black fw-500 roboto'>
                      <button className="btn bg-none w-full border-dark">
                        <span className='underline'>
                          Create an seller Account
                        </span>
                      </button>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerLogin;
