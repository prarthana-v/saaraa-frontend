import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from '../User/Pages/Home/Home.jsx'
import LoginForm from '../User/components/auth/login/login.jsx'
import RegisterForm from '../User/components/auth/register/register.jsx'

const CustomerRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/*' element={<Home />} />
      </Routes>

    </div >
  )
}

export default CustomerRouter
