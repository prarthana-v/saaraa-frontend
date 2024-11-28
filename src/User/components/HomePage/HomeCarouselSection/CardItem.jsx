import React, { useState } from 'react';

import './CardItem.css';
import { FaBullseye } from "react-icons/fa"; import { FaRegHeart } from "react-icons/fa";
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ProductDetails from '../../ProductsDetails/ProductDetails';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, clearProductDetails } from '../../../../State/ProductSlice';

const CardItem = ({ image, title, price, sizes = [], id }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { productDetails, loading, error } = useSelector((state) => state.products);
  // console.log(productDetails)
  const dispatch = useDispatch()

  const handleOpenModal = () => {
    setModalOpen(true);
    // console.log(id, "id")
    dispatch(fetchProductDetails(id)); // Fetch product details
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    dispatch(clearProductDetails()); // Clear product details on close
  };


  return (
    <div className="card-item px-2">
      {/* Card Container */}
      <div className="card-container px-5 px-sm-0">
        {/* Image Section */}
        <div className="image-wrapper">
          <img src={image} alt={title} className="card-image" />
          {/* Hover Actions */}
          <div className="hover-overlay">
            <button
              className="hover-btn"
              onClick={handleOpenModal}// Fix here
              aria-label="View Product Details"
            >
              <FaBullseye />
            </button>
            <button className="hover-btn" aria-label="Add to Wishlist">
              <FaRegHeart />
            </button>
          </div>
        </div>

        {/* Card Details */}
        <div className="card-details text-center p-2">
          <h3 className="product-title roboto text-xl text-black opacity-70">{title}</h3>
          <p className="product-price roboto mb-0 mt-3 fs-15 text-gray-600 opacity-60">₹{price}</p>
          <p className="product-sizes roboto fs-15 text-gray-600 opacity-60">
            Sizes: {sizes.length > 0 ? sizes.join(', ') : 'Not Available'}
          </p>
        </div>
      </div>

      {/* Modal for Product Details */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
        disableScrollLock
      >
        <div style={{ position: 'relative' }}>
          {/* Close Button */}
          <IconButton
            aria-label="Close"
            onClick={handleCloseModal}
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          {/* Display Loading, Error, or Product Details */}
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            productDetails && <ProductDetails productDetails={productDetails} />
          )}

        </div>
      </Dialog>
    </div>
  );
};

export default CardItem;
