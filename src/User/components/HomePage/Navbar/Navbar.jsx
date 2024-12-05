import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Close } from "@mui/icons-material";
import { Drawer, IconButton, Typography, Badge, List, ListItem, ListItemText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { BsHandbag } from "react-icons/bs";
import { fetchCategories } from "../../../../State/CategorySlice";
import { CgProfile } from "react-icons/cg";
import { Avatar } from '@mui/material'
import { getUserRecord } from "../../../../State/UserAuthSlice";
import { fetchCartItems } from "../../../../State/CartSlice";

const Navbar = () => {
  const [openCart, setOpenCart] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const dispatch = useDispatch()
  const handleCartOpen = () => setOpenCart(true);
  const handleCartClose = () => setOpenCart(false);
  const toggleUserDropdown = () => {
    setOpenUser((prev) => !prev); // Toggle the state
  };
  const { categories } = useSelector((state) => state.category)
  const { cartItems } = useSelector((state) => state.cart)
  const user = useSelector((state) => state?.userauth?.user?.user?.username);

  const firstInitial = user?.slice(0, 1) || <CgProfile />;
  const cart = cartItems?.data?.cart

  useSelector((state) => console.log(state))
  console.log(cart)

  useEffect(() => {
    dispatch(getUserRecord())
    dispatch(fetchCategories())
    dispatch(fetchCartItems())
  }, [dispatch])
  const cartItemsCount = cart?.cartTotalItems;
  return (
    <div className="w-full bg-navbar fixed top-0 z-50 montserrat-a">
      <div className="bg-navbar border-b">
        <div className="px-3 lg:px-16">
          <div className="row flex justify-around items-center py-4">
            <div className="col-6 col-sm-3 col-md-2 px-4 ">
              <div className="flex-shrink-0">
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/duxafj5j5/image/upload/v1733401863/saraa-trends-bg_chr16j.png"
                    alt="Saaraa Trends Logo"
                    className="w-auto h-[5.5rem]"
                  />
                </Link>
              </div>
            </div>
            <div className="col-6 d-md-none flex justify-end">
              <div className="col-3">
                <div className="text-gray-900">
                  <FaRegUser />
                </div>
              </div>
              <div className="col-3 d-md-none">
                <div className="text-gray-900">
                  <button className="" onClick={toggleUserDropdown}>
                    <FaBars />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 px-4 px-md-0 pt-4 pb-3">
              <div className="relative  w-full">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="pl-10 pr-4 py-2 text-md w-full rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-pprimary"
                />
                <Search className="absolute top-2.5 left-3 text-gray-400" />
              </div>
            </div>
            <div className="d-none col-md-3 d-md-flex justify-md-content-end align-items-center">
              <div className="col-3 col-lg-2">
                <div className="text-gray-900">
                  <button className="relative "
                    onClick={toggleUserDropdown}
                    aria-expanded={openUser}
                    aria-haspopup="true"
                  >
                    <FaRegUser className="text-xl mt-2" />
                  </button>
                </div>
              </div>
              <div className="col-3 col-lg-2">
                <div className="text-gray-900">
                  <button
                    className="relative"
                    onClick={handleCartOpen}
                  >
                    <Badge
                      badgeContent={cartItemsCount}
                      color="error"
                      overlap="rectangular"
                      sx={{
                        "& .MuiBadge-dot": { fontSize: "14px" },
                      }}
                    >
                      <BsHandbag className="text-xl" />
                    </Badge>
                  </button>
                </div>
              </div>
              <div className="d-none col-md-8 d-md-flex ">
                <Link className="text-sec font-medium montserrat-a fs-15 tracking-wider " to={'/seller/login'}>
                  Become a Seller
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div >

      {/* Cart Drawer */}
      {openCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-96 bg-white p-6 rounded-l-xl shadow-lg">
            {/* Close Button */}
            <div className="flex justify-between items-center mb-4 ">
              <h2 className="text-xl font-semibold ">My Cart</h2>
              <button
                className="text-center text-gray-700"
                onClick={handleCartClose}
              >
                x
              </button>

            </div>
            {/* Cart Drawer Content */}
            <div>
              {/* Display cart items here */}
              <div className="space-y-4">
                {cartItems?.length === 0 ? (
                  <div className="flex flex-col mt-10 items-center justify-center text-center ">
                    <ShoppingCart className="mx-auto text-gray-500" style={{ fontSize: '5rem' }} />
                    <p className="text-2xl font-semibold mt-6 poppins">Your Cart is Empty</p>
                    <p className="text-md text-gray-600 mt-2 poppins">
                      Looks like you haven't added anything to your cart yet.
                    </p>
                  </div>
                ) : (

                  cart?.cartitems.map((item) => (
                    <div>
                      <div className="flex items-start space-x-4 p-2 border-b">
                        {/* Product Image */}
                        <div className="w-16 h-20">
                          <img
                            src={item.productId.images[1]} // Update with the image source
                            alt={item.productName}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <p className="text-lg font-normal text-sm">{item.productName}</p>
                          <p className="text-sm text-gray-500">QTY : {item.quantity}</p>
                        </div>

                        {/* Product Price */}
                        <div className="text-lg font-semibold">
                          ₹ {item.price} {/* Replace with actual price */}
                        </div>


                      </div>
                      {/* Cart Total */}
                      <div className="mt-6 ">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total Amount :</span>
                          <span>₹ {cart?.cartTotalAmt}</span>
                        </div>
                      </div>

                      {/* Continue Shopping Button */}
                      <div className="mt-4 flex justify-center ">
                        <Link
                          to={'/cart'}
                          className="px-4 no-underline py-3  bg-pprimary text-white font-medium rounded-sm poppins tracking-wide hover:bg-gray-900 transition-all duration-300"
                        >
                          View Cart
                        </Link>
                      </div>
                    </div>
                  ))

                )}
              </div>
            </div>


          </div>
        </div>
      )}


      {/* user drawer */}
      {openUser && (
        <div className="absolute right-8 top-24 md:right-40 md:top-24 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          <ul className="py-2 text-sm text-gray-700">
            {user ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      // Add logout logic here
                      console.log("Logout clicked");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 underline"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/wishlist"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                to="/orders"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Orders
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div >
  );
};

export default Navbar;
