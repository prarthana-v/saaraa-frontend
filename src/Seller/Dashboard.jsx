import React, { useState, useEffect } from 'react'
import { Box, Grid, Card, Typography, Button, CardContent } from '@mui/material';
import axios from 'axios';
const apiurl = import.meta.env.VITE_API_URL
import { NavLink } from 'react-router-dom';
import BusinessInsightsChart from './components/BuisnessInsightsGraph';


const Dashboard = () => {
  const [sellerInfo, setSellerInfo] = useState('');

  useEffect(() => {
    const getSeller = async () => {
      try {
        const response = await axios.get(`${apiurl}/seller/check-auth`, {
          withCredentials: true, // Ensure cookies are sent
        });
        console.log("res", response.data);
        const seller = response.data.seller;
        setSellerInfo(seller)

      } catch (error) {
        console.log(error);

      }
    };
    getSeller();
  }, []);

  const cardData1 = [
    { name: 'Total Sales', path: '/total-sales', value: '$50,000' },
    { name: 'Orders', path: '/orders', value: '120' },
    { name: 'Inventory', path: '/inventory', value: '45 items' },
    { name: 'Customers', path: '/customers', value: '300' },
  ];

  const cardData2 = [
    { title: 'Low Stock', value: 5, color: '#0f0f0f' },       // Warning color
    { title: 'Out of Stock', value: 2, color: '#0f0f0f' },    // Error color
    { title: 'Top Sellers', value: 10, color: '#0f0f0f' },    // Success color
    { title: 'New Orders', value: 15, color: '#0f0f0f' },     // Primary color
  ];
  return (
    <div>
      <div>
        <Box sx={{ p: 3 }}>

          <Grid xs={12} >
            <Box className='bg-utility  ps-3 py-3' sx={{ borderRadius: 2 }}>
              <h4 className='mb-0 roboto fs-18  '>Welcome Back <span className='text-uppercase'>{sellerInfo.username}</span> !!</h4>
              <p className='mb-0 roboto fs-15 opacity-60'>Boost your business with SaaraaTrends.</p>
            </Box>
          </Grid>
          <Box className='bg-utility my-2 p-3' sx={{ borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Insights
            </Typography>
            <Grid container spacing={2} sx={{ display: 'flex' }}>
              {cardData1.map((card) => (
                <Grid item xs={12} md={3}>
                  <NavLink to={card.path} key={card.name} style={{ textDecoration: 'none' }}>
                    <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 6 } }}>
                      <CardContent>
                        <Typography variant="h6" className='opacity-60 ' component="div">
                          {card.name}
                        </Typography>
                        <Typography variant="h5" className='' sx={{ mt: 1, fontWeight: 'bold' }}>
                          {card.value}
                        </Typography>
                      </CardContent>
                    </Card>
                  </NavLink>
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* Recent Orders Table */}
          <Grid container className='my-3 d-flex justify-content-between bg-utility '>
            <Grid item xs={12} md={6} className="" >
              <Box >
                <BusinessInsightsChart />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} className=''>
              <Box sx={{ p: 3 }} className="" >
                <Grid container spacing={2}>
                  {cardData2.map((card, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Card sx={{ borderLeft: `5px solid ${card.color}`, boxShadow: 2 }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: card.color }}>
                            {card.title}
                          </Typography>
                          <Typography variant="h5" sx={{ mt: 0, mb: 0, fontWeight: 'semibold' }}>
                            {card.value}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>

          {/* Top Products */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Top Products</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 2, backgroundColor: '#f7f9fc' }}>
                  <Typography variant="h6">Product 1</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Sales: 200</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 2, backgroundColor: '#f7f9fc' }}>
                  <Typography variant="h6">Product 2</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Sales: 150</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 2, backgroundColor: '#f7f9fc' }}>
                  <Typography variant="h6">Product 3</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Sales: 130</Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Notifications */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Notifications</Typography>
            <Button sx={{ mt: 2, backgroundColor: '#1a73e8', color: '#fff' }}>
              View All Alerts
            </Button>
          </Box>
        </Box >
      </div >
    </div >
  )
}

export default Dashboard
