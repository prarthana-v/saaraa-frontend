import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from '../User/Pages/Home/Home.jsx'
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
          <Route path='/account/order' element={<Order />} />
          <Route path='/account/order/:orderid' element={<OrderDetails />} />
        </Route>
      </Routes>

    </div >
  )
}

export default CustomerRouter
