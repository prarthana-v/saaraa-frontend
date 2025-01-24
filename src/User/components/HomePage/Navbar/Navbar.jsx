import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { BsHandbag } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { fetchCategories } from "../../../../State/CategorySlice";
import { CgProfile } from "react-icons/cg";
import { getUserRecord } from "../../../../State/UserAuthSlice";
import { fetchCartItems } from "../../../../State/CartSlice";
import './navbar.css'
import SearchWithDropdown from "./SearchWithDropdown.jsx";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_URL

const Navbar = () => {
  const [openCart, setOpenCart] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const dispatch = useDispatch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleCartOpen = () => {
    setOpenCart(true);
    dispatch(fetchCartItems());
  };

  const handleCartClose = () => setOpenCart(false);

  const toggleUserDropdown = () => {
    setOpenUser((prev) => !prev); // Toggle the state
  };

  // const { categories } = useSelector((state) => state.category);
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);
  const user = useSelector((state) => state?.userauth?.user?.user?.username);

  useEffect(() => {
    dispatch(getUserRecord());
    dispatch(fetchCategories());
  }, [dispatch]);


  const handleLogout = async () => {
    try {
      const response = await axios.post(`${apiurl}/auth/logout`, {}, {
        withCredentials: true
      })
      window.location.reload();
      console.log(response)
      // toast.success("logout succesfull");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full bg-navbar fixed top-0 z-50 montserrat-a">
      <div className="bg-navbar">
        <div className="px-3 lg:px-16">
          <div className="row flex justify-between items-center pt-2 pb-2">

            <div className="col-4 d-md-none flex flex-row justify-start  align-items-center">
              <div className="pe-3">
                <Link
                  onClick={toggleUserDropdown}
                  className="text-sec font-medium montserrat-a fs-15 tracking-wider "
                >
                  <FaBars />
                </Link>
              </div>
              <div className="text-gray-900">
                {user ? (
                  <button
                    className="relative"
                    onClick={toggleUserDropdown}
                    aria-expanded={openUser}
                    aria-haspopup="true"
                  >
                    <FaRegUser className="text-xl" />
                  </button>
                ) : (
                  <Link to="/login" className="text-gray-900">
                    <FaRegUser className="text-xl" />
                  </Link>
                )}
              </div>
            </div>

            <div className="col-4 col-sm-3 col-md-2 flex justify-center">
              <div className="flex-shrink-0">
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/duxafj5j5/image/upload/v1733401863/saraa-trends-bg_chr16j.png"
                    alt="Saaraa Trends Logo"
                    className="w-auto h-[4.5rem] md:h-[5.5rem]"
                  />
                </Link>
              </div>
            </div>

            <div className="col-4 d-md-none flex flex-row justify-end align-items-center">
              <div className="pe-3 mt-1">
                <IoIosSearch onClick={handleSearchToggle} className="text-2xl font-semibold" />
              </div>
              <div className="text-gray-900">
                <button className="relative" onClick={handleCartOpen}>
                  <Badge
                    badgeContent={totalQuantity}
                    color="error"
                    overlap="rectangular"
                    sx={{ "& .MuiBadge-dot": { fontSize: "14px" } }}
                  >
                    <BsHandbag className="text-xl" />
                  </Badge>
                </button>
              </div>
            </div>

            {/* lg serch input */}
            <div className="d-none d-md-flex col-md-6 px-4 px-md-0 mt-2">
              <SearchWithDropdown />
            </div>

            {/* lg menu icons */}
            <div className="hidden col-md-3 col-lg-2 md:flex flex-row justify-around  align-items-center">
              {/* Display user icon or login based on authentication */}
              <div className=" ">
                <div className="text-gray-900">
                  {user ? (
                    <Link to="/profile" className="text-gray-900">
                      <FaRegUser className="text-xl" />
                    </Link>
                  ) : (
                    <Link to="/login" className="text-gray-900">
                      <FaRegUser className="text-xl" />
                    </Link>
                  )}
                </div>
              </div>

              <div className=" ">
                <div className="text-gray-900">
                  <button className="relative" onClick={handleCartOpen}>
                    <Badge
                      badgeContent={totalQuantity}
                      color="error"
                      overlap="rectangular"
                      sx={{ "& .MuiBadge-dot": { fontSize: "14px" } }}
                    >
                      <BsHandbag className="text-xl" />
                    </Badge>
                  </button>
                </div>
              </div>

              <div className="">
                <Link
                  onClick={toggleUserDropdown}
                  className="text-sec font-medium montserrat-a fs-15 tracking-wider "
                >
                  <FaBars />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div >

      {/* Cart Drawer */}
      {openCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end overflow-y-auto">
          <div className="w-96 bg-white p-6 rounded-l-xl shadow-lg h-full">
            {/* Close Button */}
            <div className="flex justify-between items-center mb-4 ">
              <h2 className="text-xl font-semibold">My Cart</h2>
              <button
                className="text-center text-gray-700"
                onClick={handleCartClose}
              >
                X
              </button>
            </div>
            {/* Cart Drawer Content */}
            <div>
              {/* Display cart items here */}
              <div className="space-y-4">
                {items?.length === 0 ? (
                  <div className="flex flex-col mt-10 items-center justify-center text-center ">
                    <ShoppingCart className="mx-auto text-gray-500" style={{ fontSize: '5rem' }} />
                    <p className="text-2xl font-semibold mt-6 poppins">Your Cart is Empty</p>
                    <p className="text-md text-gray-600 mt-2 poppins">
                      Looks like you haven't added anything to your cart yet.
                    </p>
                  </div>
                ) : (
                  <>
                    {items.map((item, i) => (
                      <div key={i}>
                        <div className="flex items-start space-x-4 p-2 border-b">
                          {/* Product Image */}
                          <div className="w-16 h-20">
                            <img
                              src={item.productId?.images?.[1]} // Update with the image source
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
                      </div>
                    ))}
                    {/* Cart Total */}
                    <div className="mt-6 ">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total Amount :</span>
                        <span>₹ {totalAmount}</span>
                      </div>
                    </div>

                    {/* Continue Shopping Button */}
                    <div className="mt-4 flex justify-center ">
                      <Link
                        to={'/cart'}
                        className="px-4 no-underline py-3 bg-pprimary text-white font-medium rounded-sm poppins tracking-wide hover:bg-gray-900 transition-all duration-300"
                      >
                        View Cart
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Dropdown */}

      {openUser && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-start md:justify-end transition-all duration-300"
          onClick={() => setOpenUser(false)} // Close on background click
        >
          {/* Off-Canvas Content */}
          <div
            className="bg-white h-full w-72 max-w-full rounded-r-xl md:rounded-l-xl shadow-lg overflow-y-auto transition-transform transform translate-x-0"
            style={{
              transition: "transform 1s ease-in-out",
            }}
            onClick={() => setOpenUser(false)}
          >

            <div className="font-semibold text-lg border-bottom pe-3 mb-0 py-2 flex justify-end shadow-sm sticky top-0 left-0 bg-white"><button className="text-gray-700 opacity-60 cursor-pointer" onClick={() => setOpenUser(false)}>X </button></div>
            {/* User Options */}
            <ul className="text-sm text-gray-700 ps-0">
              {user ? (
                // Logged-in User Options
                <>
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/orders"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cart"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      My Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/seller/register"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      Become a Seller
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout(); // Close the menu
                      }}
                      className="block w-full text-left px-4 py-3 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                // Guest User Options
                <>
                  <li>
                    <Link
                      to="/register"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      Create New Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/orders"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cart"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      My Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/seller/register"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      Become a Seller
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Full-screen Search Modal for Mobile */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center p-2">
          <div className="w-full max-w-lg bg-white p-2 rounded-lg">
            <div className="flex justify-end p-2">
              <button
                onClick={handleSearchToggle}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <SearchWithDropdown />
          </div>
        </div>
      )}

    </div>
  );
};

export default Navbar;
