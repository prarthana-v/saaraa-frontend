import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Footer = lazy(() => import('../../components/HomePage/Footer/Footer'));
const HomePage = lazy(() => import('./HomePage'));
const Product = lazy(() => import('../../components/ProductByCategoryPage/Product'));
const ProductPage = lazy(() => import('../../components/ProductsDetails/ProductDetailsPage'));
const Navbar = lazy(() => import('../../components/HomePage/Navbar/Navbar'));
const UserProtected = lazy(() => import('../protectedPages/userProtected'));
const Cart = lazy(() => import('../../components/Cart/Cart'));
const Profile = lazy(() => import('../../components/auth/login/profile'));
const Order = lazy(() => import('../../components/Order/order'));
const OrderDetails = lazy(() => import('../../components/Order/OrderDetails'));
const DeliveryAddressForm = lazy(() => import('../../components/Checkout/DeliveryAdddressForm'));
const OrderSummary = lazy(() => import('../../components/Checkout/OrderSummary'));
const PaymentPage = lazy(() => import('../../components/Checkout/PaymentPage'));
const CheckoutPage = lazy(() => import('../../components/Checkout/Checkout'));
const OrderConfirmationPage = lazy(() => import('../../components/Order/OrderConfirmationPage'));


const Home = () => {
  return (
    <div className='custom-scrollbar-home'>
      <div>
        <Navbar />
      </div>
      <Suspense fallback={<div className="spinner-container">
        <div className="spinner"></div></div>}>
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
      </Suspense>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
