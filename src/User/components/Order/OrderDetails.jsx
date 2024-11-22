import React from 'react'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracker from './OrderTracker'
import { deepPurple } from '@mui/material/colors'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Grid, Box } from '@mui/material';

const OrderDetails = () => {
  return (
    <>
      <div className="px:5 lg:px-20">
        <div className="">
          <h1 className='font-bold py-7 text-xl'>Delivery Address</h1>
          <AddressCard />
        </div>

        <div className="py-20">
          <OrderTracker activeStep={3} />
        </div>

        <Grid className='space-y-5' container>
          {
            [1, 1, 1].map((item) =>
              <Grid item container className='shadow-xl rounded-md p-7 border' sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Grid item xs={6}>
                  <div className="flex items-center space-x-2">
                    <div className="w-[6rem] h-[6rem]">
                      <img src="https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/29988485/2024/6/18/a0bcf2d5-b563-4f9a-add4-06075f0929e81718707632307SangriaGirlsPrintedCottonA-LineDress1.jpg" alt="" className='w-full h-full object-cover object-top' />
                    </div>
                    <div className="space-y-2 ms-4 poppins py-2">
                      <p className='text-gray-900 fs-16 fw-700 pb-1 m-0'>Pink one piece dress for small Giirls</p>
                      <p className='text-b1  m-0 fs-14 opacity-70'> <span className='pe-4'>Color : pink</span> <span>Size : M</span> </p>
                      <p className='text-b1 fs-15 m-0 opacity-70'>Seller : Abxyz</p>
                      <p className='text-b1 fs-15 m-0 opacity-70'>Rs. 1,500</p>
                    </div>
                  </div>

                </Grid>

                <Grid item>
                  <Box sx={{ color: deepPurple[500] }}>
                    <StarBorderIcon sx={{ fontSize: '2.5rem', }} className='px-2'>
                      <span>Rate & Review Product</span>
                    </StarBorderIcon>
                  </Box>
                </Grid>
              </Grid>)
          }
        </Grid>
      </div >
    </>
  )
}

export default OrderDetails
