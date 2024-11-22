import React from 'react'
import { Grid } from '@mui/material'
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import AddressCard from '../AddressCard/AddressCard'
const DeliveryAdddressForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const address = {
      FirstName: data.get("firstName"),
      LastName: data.get("lastName"),
      Address: data.get("address"),
      City: data.get("city"),
      State: data.get("state"),
      Zip: data.get("zip"),
      PhoneNumber: data.get("PhoneNumber"),
    }

    console.log('address', address);

  }
  return (
    <div>
      <Grid container spacing={4}>
        <Grid xs={12} lg={5} className='border rounded-e-md shadow-md h-[30.4rem] overflow-y-scroll'>
          <div className="p-5 py-7 border-b cursor-pointer ">
            <AddressCard />
            <button className='btn btn-dark mt-2'>Rent Here</button>
          </div>


        </Grid>
        <Grid xs={12} lg={7}>
          <Box className='border rounded-s-md shdow-md p-5'>
            <form action="" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>

                  <TextField
                    required
                    id='firstname'
                    name='firstName'
                    className='w-full'
                    autoComplete='given-name'
                    label='First Name'
                  >

                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='Lastname'
                    name='lastName'
                    className='w-full'
                    autoComplete='given-name'
                    label='Last Name'
                  >
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    id='address'
                    name='address'
                    fullWidth
                    autoComplete='given-name'
                    label='Address'
                    rows={4}
                    multiline
                  >
                  </TextField>
                </Grid>


                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='city'
                    name='city'
                    fullWidth
                    autoComplete='given-name'
                    label='City'
                  >
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='state'
                    name='state'
                    fullWidth
                    autoComplete='given-name'
                    label='State/Province/Region'
                  >
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='zip'
                    name='zip'
                    fullWidth
                    autoComplete='given-name'
                    label='Zip/Postal-Code'
                  >
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='PhoneNumber'
                    name='PhoneNumber'
                    fullWidth
                    autoComplete='given-name'
                    label='Phone Number'
                  >
                  </TextField>
                </Grid>

                <Grid mt={5} ml={3}>
                  <Button variant="contained" className='' size='large' type='submit'>Rent Here</Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default DeliveryAdddressForm
