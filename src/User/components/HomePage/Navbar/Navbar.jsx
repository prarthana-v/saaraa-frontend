import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Close } from "@mui/icons-material";
import { Drawer, IconButton, Typography, Badge, List, ListItem, ListItemText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../../State/CategorySlice";
import { CgProfile } from "react-icons/cg";
import { Avatar } from '@mui/material'
import { getUserRecord } from "../../../../State/UserAuthSlice";

const Navbar = () => {
  const [openCart, setOpenCart] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch()
  const handleCartOpen = () => setOpenCart(true);
  const handleCartClose = () => setOpenCart(false);
  const { categories } = useSelector((state) => state.category)
  const user = useSelector((state) => state?.userauth?.user?.user?.username);
  // useSelector((state) => console.log(state.userauth?.user?.user?.username))
  const firstInitial = user?.slice(0, 1) || <CgProfile />;
  // console.log(categories)
  // Sample categories array
  useEffect(() => {
    dispatch(getUserRecord())
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <div className="w-full bg-white fixed top-0 shadow-lg z-50">
      <div className="bg-light border-b">
        {/* First Row: Logo, Login, and Become a Seller */}
        <div className="flex items-center justify-between px-6 pt-3 md:justify-around">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/duxafj5j5/image/upload/v1731158192/category/w5siphjkoo9fprtbda4s.png"
                alt="Saaraa Trends Logo"
                className="h-[5.5rem]"
              />
            </Link>
          </div>

          <div className="hidden sm:flex sm:w-2/4 px-6 py-2 md:py-3">

            <div className="relative mx-auto w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="pl-10 pr-4 py-2 text-md w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <Search className="absolute top-2.5 left-3 text-gray-400" />
            </div>
          </div>

          {/* Right: Login, Become a Seller, Cart */}
          <div className="flex xs:gap-1 sm:gap-3 md:gap-4 justify-center items-center">
            <IconButton className="text-gray-900" onClick={handleCartOpen}>
              <Badge badgeContent={3} color="error">
                <ShoppingCart sx={{ color: 'black' }} />
              </Badge>
            </IconButton>
            <Link
              to="/seller/login"
              className="hidden lg:flex text-white lg:py-2 lg:px-6 xs:rounded-3xl no-underline bg-gray-800 rounded-sm font-medium hover:bg-gray-700"
            >
              Become a Seller
            </Link>

            {/* Show Login Button if the user is not logged in */}
            {!user ? (
              <Link
                to="/login"
                className="text-white xs:py-2 xs:px-6 no-underline bg-gray-800 xs:rounded-3xl rounded-sm font-medium hover:bg-gray-700"
              >
                Login
              </Link>
            ) : (
              <Link className="no-underline" to={'/profile'}>
                <Avatar
                  className="text-white"
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: '#df988f',
                    paddingBottom: '5px',
                  }}
                >
                  {firstInitial}
                </Avatar>
              </Link>

            )}
          </div>
        </div>

        {/* Second Row: Search Bar */}
        <div className="sm:hidden px-6 pb-2 pt-3 md:py-3">
          <div className="relative w-full max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <Search className="absolute top-2.5 left-3 text-gray-400" />
          </div>
        </div>

        {/* Third Row: Categories */}
        <div className="px-6 pt-2 pb-3 md:py-0">
          <div className="flex justify-center md:justify-center xs:gap-5 sm:gap-6 md:gap-9 overflow-x-auto whitespace-nowrap">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.categoryName}`} // use category.name for the URL
                className="relative text-[1.12rem] text-gray-800 capitalize font-medium tracking-wide no-underline px-3 border-2 border-gray-300 hover:border-gray-900  rounded-pill"
              >
                {category.categoryName}'s  {/* Render the category name */}
                {/* <span
                  className="absolute bottom-0 left-0 w-0 h-[1.3px] bg-gray-900 transition-all duration-300 group-hover:w-full"
                ></span> */}
              </Link>
            ))}
          </div>
        </div>

      </div >





      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={openCart}
        onClose={handleCartClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: "350px",
            padding: "20px",
            backgroundColor: "#fff",
            borderLeft: "1px solid #ccc",
          },
        }}
      >
        <IconButton
          className="absolute top-2 right-2"
          onClick={handleCartClose}
        >
          <Close />
        </IconButton>
        <Typography variant="h6" className="font-bold mb-4">
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
        <div className="mt-6">
          <Typography variant="h6" className="font-bold">
            Total: ₹ 3,097
          </Typography>
          <Link
            to="/cart"
            className="block w-full bg-green-500 text-white text-center py-2 rounded mt-3 hover:bg-green-600 transition"
          >
            View Cart
          </Link>
        </div>
      </Drawer >
    </div >
  );
};

export default Navbar;
