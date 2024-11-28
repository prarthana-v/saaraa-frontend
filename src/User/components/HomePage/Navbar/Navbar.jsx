import React, { useState } from "react";
import { Box, Button, IconButton, InputBase, Typography, Badge, Menu, MenuItem, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { ShoppingCart, Search, ExpandMore, Close, } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { KeyboardArrowDown } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import '../Navbar/navbar.css'

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [openCart, setOpenCart] = useState(false);

  const handleCategoryClick = (event) => setAnchorEl(event.currentTarget);
  const handleCategoryClose = () => setAnchorEl(null);

  const handleCartOpen = () => setOpenCart(true);
  const handleCartClose = () => setOpenCart(false);

  // Handle hover events
  const handleClick = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl2(null);
  };

  return (
    <>
      <div className="relative ">
        <div className="fixed w-full top-0 bg-white shadow-lg z-50">
          <Box sx={{ backgroundColor: "#f7f7f7", padding: "20px 20px" }}>
            {/* First Row */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              {/* Left: Nav Links */}
              <Box sx={{ display: "flex", gap: "20px" }}>
                <Button sx={{ textTransform: "none", color: "#1e1e1e" }} LinkComponent={NavLink} to='/'>Home</Button>
                <Button sx={{ textTransform: "none", color: "#1e1e1e" }} LinkComponent={NavLink} to='/'>About</Button>
                <Button sx={{ textTransform: "none", color: "#1e1e1e" }} LinkComponent={NavLink} to='/'>Contact</Button>
              </Box>

              {/* Center: Logo */}
              <Box sx={{ display: "flex", justifyContent: "center", flex: 1, position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)' }}>
                <Link to={'/'}>
                  <img src="logo/saraa-trends-bg.png" alt="Saaraa Trends Logo" className="img-fluid" style={{ height: "100px" }} />
                </Link>
              </Box>

              {/* Right: Login, Seller, Cart */}
              <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
                {/* Login Dropdown */}
                <div>
                  {/* Login Button */}
                  <Link to={'/login'}>
                    <Button
                      sx={{
                        textTransform: "none",
                        color: "#1e1e1e",
                        background: "transparent",
                        fontWeight: "bold",
                        p: 0,
                        alignItems: 'end'
                      }}
                    > Login
                    </Button>
                  </Link>
                  <button onClick={handleClick} >
                    <KeyboardArrowDown fontSize="small" />
                  </button>

                  {/* Dropdown Menu */}
                  <Menu
                    anchorEl={anchorEl2}
                    open={Boolean(anchorEl2)}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        minWidth: "250px",
                        marginTop: '25px',
                        marginLeft: "auto",
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose} sx={{ fontSize: "0.9rem" }}>
                      <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>
                        Create Account
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose} sx={{ fontSize: "0.9rem" }}>
                      <Link to="/wishlist" style={{ textDecoration: "none", color: "inherit" }}>
                        My Wishlist
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose} sx={{ fontSize: "0.9rem" }}>
                      <Link to="/account/order" style={{ textDecoration: "none", color: "inherit" }}>
                        My Orders
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose} sx={{ fontSize: "0.9rem" }}>
                      <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
                        My Cart
                      </Link>
                    </MenuItem>
                  </Menu>

                </div>

                {/* Become a Seller Button */}
                <Button
                  LinkComponent={NavLink}
                  to={"/seller/register"}
                  sx={{
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#43a047", color: "white" },
                  }}
                >
                  Become a Seller
                </Button>

                {/* Shopping Cart Button */}
                <IconButton sx={{ color: "#1e1e1e" }} onClick={handleCartOpen}>
                  <Badge badgeContent={3} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Box>
            </Box>

            {/* Second Row */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Left: Smaller Search Bar */}
              <Box sx={{ flex: 0.4 }}>
                <InputBase
                  placeholder="Search..."
                  startAdornment={<Search sx={{ marginRight: 1, color: "#888" }} />}
                  sx={{
                    width: "100%",
                    padding: "5px 15px",
                    background: "#fff",
                    borderRadius: "20px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                />
              </Box>

              {/* Right: Category Dropdown */}
              <Box>
                <Button
                  onClick={handleCategoryClick}
                  endIcon={<ExpandMore />}
                  sx={{ textTransform: "none", fontWeight: "500", color: "#1e1e1e" }}
                >
                  Categories
                </Button>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCategoryClose}>
                  <MenuItem onClick={handleCategoryClose}>
                    <Link to="/category/products" style={{ textDecoration: 'none', color: 'inherit' }}>
                      Men
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCategoryClose}>
                    <Link to="/category/products" style={{ textDecoration: 'none', color: 'inherit' }}>
                      Women
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCategoryClose}>
                    <Link to="/category/products" style={{ textDecoration: 'none', color: 'inherit' }}>
                      Kids
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCategoryClose}>
                    <Link to="/category/products" style={{ textDecoration: 'none', color: 'inherit' }}>
                      Accessories
                    </Link>
                  </MenuItem>
                </Menu>

              </Box>
            </Box>

            {/* Off-canvas Cart Drawer */}
            <Drawer
              anchor="right"
              open={openCart}
              onClose={handleCartClose}
              sx={{
                "& .MuiDrawer-paper": {
                  width: 350,
                  padding: "20px",
                  backgroundColor: "#fff",
                  borderLeft: "1px solid #ccc",
                },
              }}
            >
              {/* Close Button */}
              <IconButton
                sx={{ position: "absolute", top: "10px", right: "10px" }}
                onClick={handleCartClose}
              >
                <Close />
              </IconButton>

              {/* Cart Details */}
              <Typography variant="h6" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                Your Cart
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Product 1" secondary="₹ 999" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Product 2" secondary="₹ 1,299" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Product 3" secondary="₹ 799" />
                </ListItem>
              </List>

              <Box sx={{ marginTop: "20px" }}>
                <Typography variant="h6">Total: ₹ 3,097</Typography>
                <Button
                  LinkComponent={NavLink}
                  to='/cart'
                  sx={{
                    marginTop: "10px",
                    width: "100%",
                    backgroundColor: "#4caf50",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#43a047" },
                  }}
                >
                  View Cart
                </Button>
              </Box>
            </Drawer>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Navbar;
