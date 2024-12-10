import React from 'react'
import Heroslider from '../../components/HomePage/HeroSlider/Heroslider'
import HomeCarousel from '../../components/HomePage/HomeCarouselSection/MainCarousel'
import CategorySec from '../../components/HomePage/Categories/CategorySec.jsx'
import ServiceBlock from '../../components/HomePage/serviceBlock/ServiceBlock.jsx'
import BannerSection from '../../components/HomePage/serviceBlock/BannerSection.jsx'
import Main from './Main.jsx'

const HomePage = () => {
  return (
    <div>
      <Heroslider />
      <CategorySec />
      <Main />
      <ServiceBlock />
      <BannerSection />
      <HomeCarousel category={'women'} sectionName={"Brand1 "} />
      <HomeCarousel category={'men'} sectionName={"Brand2"} />
      <HomeCarousel category={'kid'} sectionName={"Brand3"} />
    </div>
  )
}

export default HomePage
