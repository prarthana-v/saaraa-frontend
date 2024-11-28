import React from 'react'
import Heroslider from '../../components/HomePage/HeroSlider/Heroslider'
import HomeCarousel from '../../components/HomePage/HomeCarouselSection/MainCarousel'

const HomePage = () => {
  return (
    <div>
      <Heroslider />
      <HomeCarousel sectionName={'Best Seller'} />
    </div>
  )
}

export default HomePage
