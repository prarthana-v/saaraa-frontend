import { Routes, Route } from 'react-router-dom'
import React, { lazy, Suspense } from 'react'

const LoginForm = lazy(() => import('../User/components/auth/login/login.jsx'));
const RegisterForm = lazy(() => import('../User/components/auth/register/register.jsx'));
const Home = lazy(() => import('../User/Pages/Home/Home.jsx'));

const CustomerRouter = () => {
  return (
    <div>
      <Suspense fallback={<div className="spinner-container">
        <div className="spinner"></div></div>}>
        <Routes>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/*' element={<Home />} />
        </Routes>
      </Suspense>
    </div >
  )
}

export default CustomerRouter
