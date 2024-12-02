import React from 'react'
import Heroslider from '../../components/HomePage/HeroSlider/Heroslider'
import HomeCarousel from '../../components/HomePage/HomeCarouselSection/MainCarousel'
import CategorySec from '../../components/HomePage/Categories/CategorySec.jsx'

const HomePage = () => {
  return (
    <div>
      <Heroslider />
      <CategorySec />
      <HomeCarousel category={'women'} sectionName={"Women's Collection "} />
      <HomeCarousel category={'men'} sectionName={"Men's Collection "} />
      <HomeCarousel category={'kid'} sectionName={"Kid's Collection "} />
    </div>
  )
}

export default HomePage
