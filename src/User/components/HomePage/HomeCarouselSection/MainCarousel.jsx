import React, { useState, useEffect } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './MainCarousel.css'
import '../../../styles/universalStyle.css'
import '../../../../index.css'
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, fetchProductsByCategory } from '../../../../State/ProductSlice'
import { Link } from 'react-router-dom';

const HomeCarousel = ({ sectionName, category }) => {
  console.log(category)
  const dispatch = useDispatch()
  // useSelector((state) => console.log(state.products.productsByCategory))
  const { productsByCategory, loading, errorByCategory } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsByCategory(category))
    return () => {
      dispatch({ type: 'products/clearCategory', payload: category });
    };
  }, [dispatch, category]);

  // Access the products and error for the current category
  const products = productsByCategory[category] || [];
  const errorForCategory = errorByCategory?.[category];

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error handling
  if (errorForCategory && errorByCategory[category]) {
    return <div className="text-red-500">{` ${errorByCategory[category].message}-${category}`}</div>;
  }

  // No products available
  if (products.length === 0) return <div>No products found in this category.</div>;

  return (
    <div className=''>
      <div className="container-fluid max-lg my-5 ">
        <div className="row mt-2 mb-4 flex justify-between">
          <div className='col-12 flex justify-center text-center'>
            <h3 className='ps-3 crimson-pro text-3xl lg:text-4xl tracking-widest fs-400 uppercase mb-0'>{sectionName}</h3>
          </div>
        </div>

        <div className="">
          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:px-16">
            {products.map((product, index) => (
              <a href={`/product/${product._id}`} key={product._id} className="cursor-pointer no-underline">
                <div key={index} className="relative group overflow-hidden transition" >

                  {/* Image Container */}
                  <div className="relative h-[250px] lg:h-[400px] overflow-hidden group">
                    <img
                      src={product.images?.[1] || '/default-image.jpg'}
                      alt={product.productName || 'Product Image'}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:translate-x-full"
                    />
                    <img
                      src={product.images?.[2] || '/default-image.jpg'}
                      alt={product.productName || 'Product Image'}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 -translate-x-full group-hover:translate-x-0"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="pt-3 no-underline text-left">
                    <h3 className="fs-17 tracking-widest font-semibold uppercase mb-1 text-sec opacity-90 no-underline truncate crimson-pro">
                      {product.productName}
                    </h3>
                    <div className="mt-1">
                      <p className="roboto font-medium text-sm mb-0">
                        <span className="pe-2 text-sec opacity-90 tracking-widest uppercase montserrat-a fs-14">Final Price: ₹{product.price}</span>

                        <p className="text-green-800 font-semibold opacity-60 mt-1">
                          <span className="pe-2 text-gray-800 opacity-60 line-through"> MRP: ₹{product.mrp}</span>
                          Save ₹{product.mrp - product.price} ({Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off)</p>
                      </p>

                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className='col-12 flex justify-center'>
          <Link to={`/${category}`} className="montserrat-a  no-underline flex items-center px-5 py-2" style={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid' }}>
            <span className='pe-3 fs-14  uppercase text-gray-800 font-medium'>Shop the Collection</span>  <FaArrowRightLong />
          </Link>
        </div>
      </div>
    </div>
  )

}
export default HomeCarousel
