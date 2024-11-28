import React, { useState, useEffect } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './MainCarousel.css'
import '../../../styles/universalStyle.css'
import '../../../../index.css'
import CarouselCard from './CarouselCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, fetchProductsByCategory } from '../../../../State/ProductSlice'
import { Link } from 'react-router-dom';

const HomeCarousel = ({ sectionName, category }) => {
  console.log(category)
  const dispatch = useDispatch()
  useSelector((state) => console.log(state.products))
  const { productsByCategory, loading, errorByCategory } = useSelector((state) => state.products);

  useEffect(() => {
    // dispatch(fetchAllProducts());
    dispatch(fetchProductsByCategory(category))
  }, [dispatch, category]);

  // Access the products and error for the current category
  const products = productsByCategory[category] || [];
  const errorForCategory = errorByCategory?.[category];

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error handling
  if (errorForCategory && products.length === 0) {
    return <div className="text-red-500">{`Error: ${errorForCategory}`}</div>;
  }

  // No products available
  if (products.length === 0) return <div>No products found in this category.</div>;

  return (
    <div className=''>
      <div className="container-fluid max-lg ">
        <div className="row my-2 flex justify-between">
          <div className='col-3'>
            <h3 className='poppins px-0 ps-2 mb-0'>{sectionName}</h3>
          </div>
          <div className='col-2 flex justify-end'>
            <Link to={`/${category}/`} className="text-white px-4 py-2 rounded-pill text-md bg-gray-800 font-medium no-underline text-md">
              View All
            </Link>
          </div>
        </div>

        <div className="my-8">
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Link to={`/product/${product._id}`} className="cursor-pointer no-underline">
                <div key={index} className="relative group border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition" >
                  {/* Image Container */}
                  <div className="relative h-[350px] overflow-hidden group">
                    <img
                      src={product.images?.[0] || '/default-image.jpg'}
                      alt={product.productName || 'Product Image'}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:translate-x-full"
                    />
                    <img
                      src={product.images?.[1] || '/default-image.jpg'}
                      alt={product.productName || 'Product Image'}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 -translate-x-full group-hover:translate-x-0"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-3 no-underline text-center">
                    <h3 className="text-lg font-semibold capitalize mb-1 no-underline">
                      {product.productName}
                    </h3>
                    <div className="my-3">
                      <p className="roboto  font-medium text-sm">
                        <span className="pe-2 text-gray-800">Final Price: ₹{product.price}</span> <span className="pe-2 text-gray-800 opacity-60 line-through"> MRP: ₹{product.mrp}</span> <p className="text-teal-800 font-semibold opacity-60"> Save ₹{product.mrp - product.price} ({Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off)</p>
                      </p>

                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

}
export default HomeCarousel
