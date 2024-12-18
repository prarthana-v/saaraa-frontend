import React, { Profiler } from 'react'
import Footer from '../../components/HomePage/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import Product from '../../components/ProductByCategoryPage/Product'
import ProductPage from '../../components/ProductsDetails/ProductDetailsPage'
import Navbar from '../../components/HomePage/Navbar/Navbar'
import UserProtected from '../protectedPages/userProtected'
import Cart from '../../components/Cart/Cart'
import Profile from '../../components/auth/login/profile'
import Order from '../../components/Order/order'
import OrderDetails from '../../components/Order/OrderDetails'
import DeliveryAddressForm from '../../components/Checkout/DeliveryAdddressForm'
import OrderSummary from '../../components/Checkout/OrderSummary'
import PaymentPage from '../../components/Checkout/PaymentPage'
import CheckoutPage from '../../components/Checkout/Checkout'
import OrderConfirmationPage from '../../components/Order/OrderConfirmationPage'
// import 

const Home = () => {
  return (
    <div className='custom-scrollbar-home'>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/:categoryName/:subcategoryName' element={<Product />} />
        <Route path='/:categoryName' element={<Product />} />
        <Route path='/product/:productId' element={< ProductPage />} />
        <Route element={<UserProtected />}>
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/checkout/selectaddress' element={<DeliveryAddressForm />} />
          <Route path='/checkout/ordersummary' element={<OrderSummary />} />
          <Route path='/checkout/payment' element={<PaymentPage />} />
          <Route path='/order-confirmation' element={<OrderConfirmationPage />} />
          <Route />
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
