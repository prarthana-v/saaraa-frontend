import React from 'react'
import { Grid } from '@mui/material'
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';

const OrderCard = () => {
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/account/order/${5}`)} className='p-4 shadow-md border shadow-gray'>
      <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
        <Grid item xs={6}>
          <div className="flex cursor-pointer">
            <img src="https://images.unsplash.com/photo-1650602979536-74222284e5e2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2lybCUyMGRyZXNzfGVufDB8fDB8fHww" className='h-[5rem] w-[5rem] object-cover object-top' alt="" />

            <div className="ms-4">
              <p className='mb-2'>Girl in Pink Dress</p>
              <p className='mb-1 opacity-50 text-xs font-semibold'> Size : M</p>
              <p className='mb-1 opacity-50 text-xs font-semibold'>Color : black</p>

            </div>
          </div>
        </Grid>
        <Grid item xs={2}>
          <p>$1899</p>
        </Grid>
        <Grid item x={4}>
          {true && <div>
            <p className='mb-0'>
              <AdjustIcon sx={{ width: "20px", height: "20px" }} className='mr-2 text-green-500 text-sm' />
              <span>Delivered on 9th March</span>
            </p>
            <p className='text-sx opacity-60'>
              Your Item has been Delivered
            </p>
          </div>

          }
          {false && <p>
            <AdjustIcon sx={{ width: "20px", height: "20px" }} className='mr-2 text-red-500 text-sm' />
            <span>
              Expected delivery on 3rd march
            </span>
          </p>}

        </Grid>
      </Grid>
    </div>
  )
}

export default OrderCard
