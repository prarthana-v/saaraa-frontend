import React, { useState } from 'react';
import { TextField, Button, Grid, } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const BusinessDetailsForm = () => {
  const navigate = useNavigate(); // For redirection
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    businessAddress: '',
    businessPhone: '',
    taxId: '',
    holderName: '', // Add holder name field
    gstin: '',
    gstAddress: '',
    bankName: '',
    bankAccount: '',
    ifscCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can store formData in Redux or send to the server here
    console.log('Business Details:', formData);

    // Redirect to Step 3
    navigate('/seller');
  };

  return (
    <div className="container">
      <div className="row flex items-center justify-between mt-3 pb-3 border-bottom">
        <div className="col-3" >
          <div className="logo d-flex align-items-center">
            <img src="/logo/saraa-trends-bg.png" className='w-[5rem] h-auto object-cover' alt="" />
            <p className='montserrat fw-500 mb-0 ps-3 fs-20'>Saaraa Trends</p>
          </div>

        </div>
        <div className="col-2">
          <Grid item xs={12}  >
            <Button
              color='success'
              component={NavLink}
              to="/seller/login"
              variant="contained"
              className=" text-white fw-500 px-4 py-2 fs-20 "
            >
              Login
            </Button>
          </Grid>
        </div>
      </div>
      <div className="row  mt-4">
        <div className="col-8">
          <div className='mt-2 mb-4'>
            <p className='mb-0 poppins font-semibold fs-18 text-black '>Welcome to Saaraa Trends </p>
            <p className='mb-0 poppins fs-14 text-gray opacity-70'>Register your Buisness to start selling</p>
          </div>
          <Grid container spacing={2} className=''>
            <Grid item xs={12}>
              <h4 className='roboto text-capitalize mb-0 fs-24'>Business Details</h4>
            </Grid>

            {/* Business Name and Business Type (Half-Half) */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Business Name"
                variant="outlined"
                fullWidth
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Business Type"
                variant="outlined"
                fullWidth
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
              />
            </Grid>

            {/* Business Address and Business Phone (Half-Half) */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Business Address"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Business Phone"
                variant="outlined"
                fullWidth
                name="businessPhone"
                value={formData.businessPhone}
                onChange={handleChange}
              />
            </Grid>

            {/* Holder Name */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Business Holder Name"
                variant="outlined"
                fullWidth
                name="holderName"
                value={formData.holderName}
                onChange={handleChange}
              />
            </Grid>

            {/* GST Details */}
            <Grid item xs={12}>
              <h4 className='roboto text-capitalize mb-0 fs-24'>GST Details</h4>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="GSTIN"
                variant="outlined"
                fullWidth
                name="gstin"
                value={formData.gstin}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="GST Address"
                variant="outlined"
                fullWidth
                name="gstAddress"
                value={formData.gstAddress}
                onChange={handleChange}
              />
            </Grid>

            {/* Bank Account Details */}
            <Grid item xs={12}>
              <h4 className='roboto text-capitalize mb-0 fs-24'>Bank Account Details</h4>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Bank Name"
                variant="outlined"
                fullWidth
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Bank Account Number"
                variant="outlined"
                fullWidth
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="IFSC Code"
                variant="outlined"
                fullWidth
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}  >

              <Button
                variant="contained"
                color="primary"
                className='w-25 p-2'
                onClick={handleSubmit}
                fullWidth
              >
                Register As Seller
              </Button>

            </Grid>
          </Grid>
        </div>
        <div class="col-4 p-4" >
          <div className="shadow-lg p-4 h-full bg-indigo-100">
            <h3 class="text-sec poppins fs-24 mb-3">Grow your business faster by selling on <span className='montserrat'>Saaraa Trends</span></h3>

            <div class="d-flex align-items-start mb-3">
              <i class="fas fa-users text-secondary me-3 fs-24"></i>
              <div>
                <strong>11 lakh+</strong><br />
                <small>Suppliers are selling commission-free</small>
              </div>
            </div>

            <div class="d-flex align-items-start mb-3">
              <i class="fas fa-map-marker-alt text-secondary me-3 fs-24"></i>
              <div>
                <strong>19,000+</strong><br />
                <small>Pincodes supported for delivery</small>
              </div>
            </div>

            <div class="d-flex align-items-start mb-3">
              <i class="fas fa-rupee-sign text-secondary me-3 fs-24"></i>
              <div>
                <strong>Crore of</strong><br />
                <small>Customers buy across India</small>
              </div>
            </div>

            <div class="d-flex align-items-start mb-4">
              <i class="fas fa-th-large text-secondary me-3 fs-24"></i>
              <div>
                <strong>700+</strong><br />
                <small>Categories to sell</small>
              </div>
            </div>

            <h5 class="text-black poppins font-semibold mt-5">All you need to sell on Saara is:</h5>
            <ul class="list-unstyled ms-3">
              <li className='py-1 text-gray-500 font-semibold fs-16 list-disc'> GSTIN (for regular/composition GST sellers)</li>
              <li className='py-1 text-gray-500 font-semibold fs-16 list-disc'> Bank Account</li>
            </ul>
          </div>
        </div>

      </div>
    </div >
  );
};

export default BusinessDetailsForm;
