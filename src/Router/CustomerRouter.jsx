import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from '../User/Pages/Home/Home.jsx'
import Cart from '../User/components/Cart/Cart.jsx'
import ProductDetails from '../User/components/ProductsDetails/ProductDetails.jsx'
import Checkout from '../User/components/Checkout/Checkout.jsx'
import Order from '../User/components/Order/order.jsx'
import OrderDetails from '../User/components/Order/OrderDetails.jsx'
import LoginForm from '../User/components/auth/login/login.jsx'
import RegisterForm from '../User/components/auth/register/register.jsx'

const CustomerRouter = () => {
  return (
    <div>

      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route>
          <Route path='/*' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:productId' element={<ProductDetails />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/account/order' element={<Order />} />
          <Route path='/account/order/:orderid' element={<OrderDetails />} />
        </Route>
      </Routes>

    </div >
  )
}

export default CustomerRouter
