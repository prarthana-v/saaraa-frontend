import React from 'react'
import { Stepper, Step, StepLabel } from '@mui/material';


const OrderTracker = ({ activeStep }) => {
  const steps = [
    "Placed", "Order Confirmed", "Shipped", " Out For Delivery ", "Delivered"
  ]
  return (
    <div className='w-full '>
      <Stepper activeStep={activeStep} alternativeLabel>
        {
          steps.map((label) => <Step>
            <StepLabel sx={{ color: '#9155fd' }}>{label}</StepLabel>
          </Step>)
        }
      </Stepper>
    </div>
  )
}

export default OrderTracker
