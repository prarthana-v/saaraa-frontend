import { Avatar, Box, Rating } from '@mui/material'
import React from 'react'
import { Grid } from '@mui/material';


const ProductReviewCard = () => {
  return (
    <div>
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
          <Box className="mt-1">
            <Avatar className='text-white ' sx={{ width: 50, height: 50, bgcolor: '#9155fd' }}>R</Avatar>
          </Box>
        </Grid>

        <Grid item xs={9}>
          <div className="space-y-2">
            <div className="">
              <p className='mb-1 font-semibold text-lg '>Ram</p>
              <p className='mb-1 opacity-70'>April 5, 2023</p>
            </div>
          </div>
          <Rating value={3.5} precision={.5} readOnly name='half-rating'></Rating>
          <p>Lorem ipsum dolor sit amet consectetur </p>
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductReviewCard
