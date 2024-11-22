import React from 'react'
import Navigation from '../../components/HomePage/Navbar/Navbar'
import Footer from '../../components/HomePage/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'


const Home = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
