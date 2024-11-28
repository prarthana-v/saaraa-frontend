import React from 'react'
import Heroslider from '../../components/HomePage/HeroSlider/Heroslider'
import HomeCarousel from '../../components/HomePage/HomeCarouselSection/MainCarousel'

const HomePage = () => {
  return (
    <div>
      <Heroslider />
      <HomeCarousel category={'women'} sectionName={"Women's Collection "} />
      <HomeCarousel category={'men'} sectionName={"Men's Collection "} />
      <HomeCarousel category={'kid'} sectionName={"Kid's Collection "} />
    </div>
  )
}

export default HomePage
