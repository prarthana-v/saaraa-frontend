import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Typography } from '@mui/material';
import { Menu, Dashboard, ShoppingCart, Inventory, Person } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { flexbox, Grid } from '@mui/system';

const sidebarWidth = '16%';

const ResponsiveSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Sidebar menu items
  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/seller' },
    { text: 'Orders', icon: <ShoppingCart />, path: '/seller/orders' },
    { text: 'Inventory', icon: <Inventory />, path: '/seller/inventory' },
    { text: 'Customers', icon: <Person />, path: '/seller/customers' },
    { text: 'Products', icon: <Person />, path: '/seller/products' },
  ];

  // Drawer content
  const drawerContent = (
    <Box sx={{ height: '100%', color: '#ffffff' }}>
      <Grid item sx={{ display: 'flex', justifyContent: 'center', pt: 2, flexDirection: 'column', alignItems: 'center' }}>
        <img src="/logo/saraa-trends-bg.png" style={{ width: '100px', height: 'auto' }} alt="" />
        <p className='montserrat text-black fs-4 fw-500 pt-2'>Saaraa Trends</p>
      </Grid>
      <List className='m-0 p-0'>
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.text}
            style={{ textDecoration: 'none', color: '#ffffff' }}
            activeStyle={{ backgroundColor: '#3a3a4a' }} // Active item background
          >
            <ListItem button sx={{ mt: 2, py: 0 }}>
              <ListItemIcon sx={{ color: '#000' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: '#000' }} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Box >
  );

  return (
    <Box>
      {/* Hamburger Menu for Small Screens */}
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          display: { lg: 'none' }, // Only show on small screens
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1201,
          color: '#ffffff',
        }}
      >
        <Menu />
      </IconButton>

      {/* Permanent Drawer for Large Screens */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', lg: 'block' }, // Hide on small screens
          '& .MuiDrawer-paper': {
            width: sidebarWidth,
            boxSizing: 'border-box',

            backgroundColor: '#f0f0f0',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Temporary Drawer for Small Screens */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better performance on mobile
        sx={{
          display: { xs: 'block', lg: 'none' }, // Show on small screens
          '& .MuiDrawer-paper': {
            width: sidebarWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1f1f2e',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default ResponsiveSidebar;
