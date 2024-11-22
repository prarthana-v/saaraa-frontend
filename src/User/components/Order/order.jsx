import React from 'react'
import { Grid } from '@mui/material'
import OrderCard from './OrderCard'

const orderStatus = [
  {
    label: "currently rented",
    value: "currentlyrented"
  },
  {
    label: "pastly rented",
    value: "pastlyrented"
  },
  {
    label: "Cancelled",
    value: "cancelled"
  },
]

const Order = () => {
  return (
    <div className='p-5 lg:px-20 '>
      <h1 className='poppins text-3xl mb-5 ms-2'>My Orders</h1>
      <Grid container sx={{ justifyContent: 'space-between' }}>
        <Grid item xs={2.5}>
          <div className="h-auto shadow-md bg-white p-5 sticky top-5">
            <h1 className='font-bold text-2xl'>Filter</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold text-lg">Order Status</h1>
              {
                orderStatus.map((option) =>
                  <div className="flex items-center">
                    <input type="checkbox" className='h-4 w-4 border text-gray-300 text-indigo-500 focus:ring-indigo-500'
                      defaultValue={option.value} />
                    <label className='ml-3 text-sm text-gray-800' htmlFor={option.label}>
                      {option.label}
                    </label>
                  </div>
                )
              }
            </div>
          </div>
        </Grid>
        <Grid item xs={9}>
          <div className='space-y-5'>
            {
              [1, 1, 1, 1, 1, 1, 1,].map((item) => <OrderCard />)
            }
          </div>
        </Grid>

      </Grid>
    </div >
  )
}

export default Order
