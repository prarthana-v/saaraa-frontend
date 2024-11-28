import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './HeroSlider.css'
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import heroData from './HerosliderData';

// Custom Next Arrow
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className='next'
      onClick={onClick}
    >
      <span className='next-icon'><GrNext /></span>
    </div>
  );
};

// Custom Previous Arrow
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className='prev'
      onClick={onClick}
    >
      <span className='prev-icon'><GrPrevious /></span>
    </div>
  );
};

const Heroslider = () => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    // nextArrow: <NextArrow />, // Add custom Next Arrow
    // prevArrow: <PrevArrow />  // Add custom Previous Arrow
  };
  return (
    <div className="slider-container mt-38">

      <Slider {...settings}>
        {
          heroData.map((item) => (
            <div className="slider">
              <img src={item.image} alt="" className='slider-image' />
            </div>
          ))
        }
      </Slider>
    </div>

  )
}

export default Heroslider
