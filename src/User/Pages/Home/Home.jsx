import React, { Profiler } from 'react'
import Footer from '../../components/HomePage/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import Product from '../../components/ProductByCategoryPage/Product'
import ProductPage from '../../components/ProductsDetails/ProductDetailsPage'
import Navbar from '../../components/HomePage/Navbar/Navbar'
import UserProtected from '../protectedPages/userProtected'
import Cart from '../../components/Cart/Cart'
import Checkout from '../../components/Checkout/Checkout'
import Profile from '../../components/auth/login/profile'
import Order from '../../components/Order/order'
import OrderDetails from '../../components/Order/OrderDetails'
// import 

const Home = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/:categoryName' element={<Product />} />
        <Route path='/product/:productId' element={< ProductPage />} />
        <Route element={<UserProtected />}>
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/account/order' element={<Order />} />
          <Route path='/account/order/:orderid' element={<OrderDetails />} />
          <Route />
        </Route>
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
