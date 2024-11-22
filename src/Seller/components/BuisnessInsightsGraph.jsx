import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

const data = [
  { month: 'Jan', sales: 5000, orders: 200 },
  { month: 'Feb', sales: 7000, orders: 300 },
  { month: 'Mar', sales: 8000, orders: 350 },
  { month: 'Apr', sales: 10000, orders: 400 },
  { month: 'May', sales: 12000, orders: 450 },
  { month: 'Jun', sales: 15000, orders: 500 },
];

const BusinessInsightsChart = () => {
  return (
    <Box sx={{ p: 3, }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Business overview
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#1a73e8" strokeWidth={2} />
          <Line type="monotone" dataKey="orders" stroke="#ff9800" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BusinessInsightsChart;
