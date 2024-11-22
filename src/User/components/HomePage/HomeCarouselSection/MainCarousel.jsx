import React, { useState, useEffect } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './MainCarousel.css'
import '../../../styles/universalStyle.css'
import '../../../../index.css'
import CarouselCard from './CarouselCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../../../State/ProductSlice'

const HomeCarousel = ({ data, sectionName }) => {
  const dispatch = useDispatch()
  // useSelector((state) => console.log(state.products))
  const { products, loading, error } = useSelector((state) => state.products);


  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div className=''>
      <div className="container my-5">
        <div className="row mb-4">
          <h3 className='h2 poppins px-0 ps-2 mb-0'>{sectionName}</h3>
        </div>
        <CarouselCard product={products} />
      </div>
    </div>
  )

}
export default HomeCarousel
