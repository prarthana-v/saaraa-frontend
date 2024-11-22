import React from 'react'
import Heroslider from '../../components/HomePage/HeroSlider/Heroslider'
import HomeCarousel from '../../components/HomePage/HomeCarouselSection/MainCarousel'
import { womens_dress } from '../../../Data/womens_dress'

const HomePage = () => {
  return (
    <div>
      <Heroslider />
      <HomeCarousel data={womens_dress} sectionName={'Best Seller'} />
    </div>
  )
}

export default HomePage
