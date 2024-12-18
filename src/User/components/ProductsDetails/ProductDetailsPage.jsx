import React, { useState, useEffect } from 'react';
import { Box, Card, CardMedia, Typography, Stack, Chip, Button, Grid, CircularProgress } from '@mui/material';
import { IconButton } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../../../State/ProductSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './productdetails.css'
import ProductReviewCard from './ProductReviewCard';
import { addToCart } from '../../../State/CartSlice';
import { toast } from "react-toastify";

const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  // console.log(productId)
  const [activeImageIndex, setActiveImageIndex] = useState(0); // Active image index
  const [autoSlide, setAutoSlide] = useState(true); // Controls auto sliding
  const product = useSelector((state) => state.products.productDetails);
  const isLoading = useSelector((state) => state.products.loading);
  const isAuthenticated = useSelector((state) => state.userauth.isAuthenticated);
  const user = useSelector((state) => state.userauth);
  // console.log(user)
  const location = useLocation()
  const { cartLoading, cartError } = useSelector((state) => state.cart);
  // useSelector((state) => console.log(state.cart))

  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  // Function to handle image change
  const changeImage = (index) => {
    if (product?.images && index >= 0 && index < product.images.length) {
      setActiveImageIndex(index);
    }
  };

  const nextImage = () => {
    if (product?.images?.length) {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images?.length) {
      setActiveImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    }
  };

  // Automatically change the image every 3 seconds
  useEffect(() => {
    let interval;
    if (autoSlide && product?.images?.length > 0) {
      interval = setInterval(() => {
        nextImage();
      }, 7000); // Change image every 3 seconds
    }
    return () => clearInterval(interval);
  }, [autoSlide, product?.images?.length > 0]);

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  // Render nothing if product data is not available
  if (!product) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <Typography variant="h6">Product not found</Typography>
      </Box>
    );
  }

  const handleCart = async () => {
    try {
      if (!isAuthenticated) {
        // If not authenticated, redirect to login
        localStorage.setItem("redirectAfterLogin", location.pathname); // Save the current path for post-login redirect
        toast.info(
          <div className="ps-3">
            <p>You need to be logged in to add items to your cart.</p>
            <button
              style={{ marginRight: "10px" }}
              className="btn btn-primary border-0"
              onClick={() => {
                navigate("/login"); // Redirect to login page
                toast.dismiss(); // Dismiss the toast
              }}
            >
              Login Now
            </button>
            <button
              className="btn btn-dark border-0"
              onClick={() => {
                toast.dismiss(); // Dismiss the toast
              }}
            >
              Cancel
            </button>
          </div>,
          { autoClose: false, closeButton: false } // Keep the toast open until the user interacts
        );
        return; // Stop further execution if not authenticated
      }

      // If authenticated, dispatch the addToCart action
      let result = await dispatch(
        addToCart({
          productId: productId,
          quantity: 1,
        })
      );

      console.log("cart response of dispatch", result);
      if (result?.payload?.success) {
        toast.success("Product added to cart!");
      } else {
        toast.error("Failed to add product to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <Box className="px-4 py-6 mt-32">
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ pt: '20px' }}>
          <Typography variant="subtitle1" color="text.secondary" className="italic">
            {product.categoryName} / {product.subcategoryName} / {product.productName}
          </Typography>
        </Grid>

        {/* Thumbnails Section */}
        <Grid item xs={12} md={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center' }}>
          {product?.images?.map((image, index) => (
            <div key={index} className="cursor-pointer mx-2 ">
              <div className='border w-[5rem] h-[5rem] rounded-lg my-1 overflow-hidden'>
                <img
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className='w-full h-full object-cover'
                  onClick={() => changeImage(index)}
                />
              </div>
            </div>
          ))}
        </Grid>

        {/* Left: Product Image */}
        <Grid item xs={12} md={4}>
          <div className="img-card flex justify-center relative">
            {/* Prev Button (ArrowBack) */}
            <IconButton
              onClick={prevImage}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '-17px', // Adjust left/right to position horizontally
                transform: 'translateY(-50%)', // Centers vertically
                background: 'black',
                color: 'white',
                '&:hover': {
                  background: 'gray', // Background color on hover
                },
              }}
              className="w-[2rem] h-[2rem]"
            >
              <ArrowBack />
            </IconButton>

            <div className="w-full shadow-lg h-[500px]">
              <img
                src={product?.images?.[activeImageIndex]}
                alt=""
                className={`w-full h-full object-cover transition-all duration-1000 ease-in-out}`}
              />
            </div>

            {/* Next Button (ArrowForward) */}
            <IconButton
              onClick={nextImage}
              sx={{
                position: 'absolute',
                top: '50%',
                right: '-17px', // Adjust left/right to position horizontally
                transform: 'translateY(-50%)', // Centers vertically
                background: 'black',
                color: 'white',
                '&:hover': {
                  background: 'gray', // Background color on hover
                },
              }}
              className="w-[2rem] h-[2rem] hover:bg-black"
            >
              <ArrowForward />
            </IconButton>
          </div>
        </Grid>


        {/* Right: Product Details */}

        <Grid item xs={12} md={6}>
          <Box>
            {/* Product Name */}
            <p className="poppins text-xl mb-2 font-semibold capitalize">
              {product.productName}
            </p>

            {/* Description */}
            <p className="poppins text-md capitalize">
              {product.description}
            </p>

            {/* Pricing */}
            <Box className="my-3">
              <p className="roboto font-normal text-xl">
                Final Price: ₹{product.price}
              </p>
              <p className="roboto font-light text-md line-through text-gray-500 ">
                MRP: ₹{product.mrp}
              </p>
              <p className="roboto font-medium  text-md text-teal-600 mb-1">
                Save ₹{product.mrp - product.price} ({Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off)
              </p>
            </Box>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <Box>
                <p className="roboto opacity-70 text-md capitalize">
                  Available Sizes:
                </p>
                <Stack direction="row" spacing={2} className="mb-3">
                  {product.sizes.map((size, index) => (
                    <Chip
                      key={index}
                      label={size}
                      className="text-xl font-bold bg-teal-100 text-teal-800"
                    />
                  ))}
                </Stack>
              </Box>
            )}



            {/* Stock Availability */}
            {/* <p className={`roboto text-md mt-3 ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.stock > 0 ? `${product.stock} items in stock` : "Out of stock"}
            </p> */}

            {/* Action Buttons */}
            <Stack direction="row" spacing={3} className="mt-5">
              <button className="shine-button" onClick={() => handleCart()} disabled={cartLoading}>
                {cartLoading ? "Adding..." : "Add To Cart"}
              </button>
              {cartError && <p className="text-red-500">{cartError}</p>}
              <button className="shine-button">Rent Now</button>
            </Stack>

            {/* Divider and Additional Notes */}
            <p className="roboto opacity-60 text-md mt-10 border-t pt-3">
              Product Details:
            </p>
            {/* Additional Product Details */}
            <Box className="my-3">
              {product.color && (
                <p className="roboto text-md capitalize">
                  Color: <span className="font-semibold">{product.color}</span>
                </p>
              )}
              {product.sleeveLength && (
                <p className="roboto text-md capitalize">
                  Sleeve Length: <span className="font-semibold">{product.sleeveLength}</span>
                </p>
              )}
              {product.material && (
                <p className="roboto text-md capitalize">
                  Material: <span className="font-semibold">{product.material}</span>
                </p>
              )}
              {product.occasion && (
                <p className="roboto text-md capitalize">
                  Occasion: <span className="font-semibold">{product.occasion}</span>
                </p>
              )}
              {product.pattern && (
                <p className="roboto text-md capitalize">
                  Pattern: <span className="font-semibold">{product.pattern}</span>
                </p>
              )}
              {product.manufacturerDetails && (
                <p className="roboto text-md capitalize">
                  Manufacturer: <span className="font-semibold">{product.manufacturerDetails}</span>
                </p>
              )}
              {product.packerDetails && (
                <p className="roboto text-md capitalize">
                  Packer: <span className="font-semibold">{product.packerDetails}</span>
                </p>
              )}
            </Box>
          </Box>
        </Grid>

      </Grid>

      <div className="lg:px-8 lg:mt-20">
        {
          [1, 1, 1].map((r, i) => (
            <ProductReviewCard key={i} />
          ))
        }
      </div>
    </Box >
  );
};

export default ProductPage;
