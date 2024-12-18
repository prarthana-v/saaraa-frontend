import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../../../State/ProductSlice'

const Main = () => {
  const dispatch = useDispatch()
  // useSelector((state) => console.log(state.products))
  const { products, loading, error } = useSelector((state) => state.products);
  // console.log(products)

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch]);

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error handling
  if (error) {
    return <div className="text-red-500">error</div>;
  }

  // No products available
  if (products.length === 0) return <div>No products found.</div>;

  return (
    <div>

      <div className="">
        <div className="row mt-2 mb-4 flex justify-between">
          <div className='col-12 flex justify-center'>
            <h3 className='crimson-pro text-3xl ps-3 lg:text-4xl tracking-widest fs-400 uppercase mb-0'>New Arrivals</h3>
          </div>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-3">
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
                    src={product.images?.[0] || '/default-image.jpg'}
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
    </div>
  )
}

export default Main
