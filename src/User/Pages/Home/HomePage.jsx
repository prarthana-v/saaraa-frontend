import React from 'react'
import Heroslider from '../../components/HomePage/HeroSlider/Heroslider'
import HomeCarousel from '../../components/HomePage/HomeCarouselSection/MainCarousel'
import CategorySec from '../../components/HomePage/Categories/CategorySec.jsx'
import ServiceBlock from '../../components/HomePage/serviceBlock/ServiceBlock.jsx'
import BannerSection from '../../components/HomePage/serviceBlock/BannerSection.jsx'
import HomeMain from './Main.jsx'

const HomePage = () => {
  return (
    <div>
      <Heroslider />
      <CategorySec />
      {/* <HomeMain category="women" sectionName="New Arrivals" resetGlobalRenderedIds={true} /> */}
      {/* <HomeMain category="women" sectionName="Trending Now" resetRenderedIds={true} /> */}
      {/* <HomeMain category="men" sectionName="Latest Picks" /> */}
      <ServiceBlock />
      <HomeCarousel category={'women'} sectionName={"New Arrivals "} />
      <HomeCarousel category={'men'} sectionName={"Men's Collection "} />
      <HomeCarousel category={'kid'} sectionName={"Kid's Collection "} />
      <BannerSection />
      {/* <HomeCarousel category={'women'} sectionName={"New Arrivals "} /> */}
      {/* <HomeCarousel category={'men'} sectionName={"Men's Collection "} /> */}
      {/* <HomeCarousel category={'kid'} sectionName={"Kid's Collection "} /> */}
    </div>
  )
}

export default HomePage
