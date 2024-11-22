import React from 'react'
import Slider from "react-slick";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CardItem from './CardItem';


const CarouselCard = ({ product }) => {
  console.log(product);

  // Custom Next and Prev buttons
  const NextArrow = ({ onClick }) => (
    <div className="next-arrow" onClick={onClick}>
      <ArrowCircleRightIcon fontSize="large" />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="prev-arrow" onClick={onClick}>
      <ArrowCircleLeftIcon fontSize="large" />
    </div>
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default: show 4 slides
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [

      {
        breakpoint: 768, // For screens smaller than 768px
        settings: {
          slidesToShow: 3, // Show 2 slides
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576, // For screens smaller than 480px
        settings: {
          slidesToShow: 2, // Show 1 slide
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <div>
      <div className="row">
        <div className="px-0">
          <div className="px-0">
            <Slider {...settings}>
              {
                product.map((c) => <CardItem image={c.images[0]} sizes={c.sizes} title={c.productName} price={c.price} />)
              }
            </Slider>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CarouselCard
