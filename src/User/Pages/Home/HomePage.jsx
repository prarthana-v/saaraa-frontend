import React from 'react'
import Heroslider from '../../components/HomePage/HeroSlider/Heroslider'
import HomeCarousel from '../../components/HomePage/HomeCarouselSection/MainCarousel'
import CategorySec from '../../components/HomePage/Categories/CategorySec.jsx'
import ServiceBlock from '../../components/HomePage/serviceBlock/ServiceBlock.jsx'
import BannerSection from '../../components/HomePage/serviceBlock/BannerSection.jsx'

const HomePage = () => {
  return (
    <div>
      <Heroslider />
      <CategorySec />
      <ServiceBlock />
      <HomeCarousel category={'women'} sectionName={"New Arrivals "} />
      <BannerSection />
      <HomeCarousel category={'men'} sectionName={"Men's Collection "} />
      <HomeCarousel category={'kid'} sectionName={"Kid's Collection "} />
    </div>
  )
}

export default HomePage
