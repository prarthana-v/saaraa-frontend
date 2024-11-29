// import { BrowserRouter, Route, Routes } from "react-router-dom"
// import Register from "./components/auth/register/register"
// import Login from "./components/auth/login/login"
// import ForgotPassword from "./components/auth/forgot-password/forgotPassword"
// import ResetPassword from "./components/auth/reset-password/resetPassword"
// import Home from "./Pages/Home/Home"
// import UserProtected from "./Pages/protectedPages/userProtected"
// import EmailVerificationSuccess from "./components/auth/email-verify-success/emailVerifySuccess"
// import Profile from "./components/auth/login/profile"
// import Checkout from "./components/Checkout/Checkout"

// function App() {

//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
// {/* <Route element={<UserProtected />}> */}
//           <Route path="/" element={<Home />} />
//           <Route path="/profile" element={<Profile />} />
//           {/* </Route> */}
//           {/* <Route path="/register" element={<Register />} /> */}
//           {/* <Route path='/login' element={<Login />} /> */}
//           <Route path="/password/forgot" element={<ForgotPassword />} />
//           <Route path="/password/reset" element={<ResetPassword />} />
//           <Route path="/email-verification-success" element={<EmailVerificationSuccess />} />
//           <Route path="/checkout" element={<Checkout />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   )
// }

// export default App

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CustomerRouter from './Router/CustomerRouter.jsx'
import SellerRouter from './Router/SellerRouter.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './User/Pages/ScrollToTop.jsx';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/*' element={<CustomerRouter />}></Route>
          <Route path='/seller/*' element={<SellerRouter />} />
        </Routes>
      </BrowserRouter>
      {/* Add ToastContainer here to make it accessible throughout the app */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
