import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './HeroSlider.css'
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import heroData from './HerosliderData';
import { useDispatch } from 'react-redux';
import axios from 'axios';
const apiurl = import.meta.env.VITE_API_URL

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

  const dispatch = useDispatch();

  const [banners, setBanners] = useState([])

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        let response = await axios.get(`${apiurl}/superadmin/banners`)
        console.log(response.data.banners);
        setBanners(response?.data?.banners || []);
      } catch (error) {
        console.log('failed to fetch banners', error)
      }
    }
    fetchBanners();
  }, [dispatch])


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
    <div className="slider-container mt-[11rem] lg:mt-[8.5rem]">

      <Slider {...settings}>
        {
          banners.map((item) => (
            <div key={item._id} className="slider">
              <img src={item.image} alt="" className='slider-image' />
            </div>
          ))
        }
      </Slider>
    </div>

  )
}

export default Heroslider
