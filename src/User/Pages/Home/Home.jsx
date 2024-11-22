import React from 'react'
import Navigation from '../../components/HomePage/Navbar/Navbar'
import Footer from '../../components/HomePage/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import Cart from '../../components/Cart/Cart'
import Checkout from '../../components/Checkout/Checkout'
import Product from '../../components/ProductByCategoryPage/Product'
import ProductDetails from '../../components/ProductsDetails/ProductDetails'

const Home = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/category/products' element={<Product />} />
        <Route path='/product/:productId' element={<ProductDetails />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
