import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Seller from '../Seller/Seller'
import SellerRegister from '../Seller/SellerAuth/RegisterSeller'
import BusinessDetailsForm from '../Seller/SellerAuth/BuissnessDetailsForm'
import SellerLogin from '../Seller/SellerAuth/LoginSeller'
import SellerProtectedRouter from '../Seller/protectedPage/SellerProtectedRouter.jsx'
import ProductCreate from '../Seller/ProductCreate.jsx'
import SelectCategoryPage from '../Seller/SelectCategory.jsx'
import EditProductPage from '../Seller/EditProductPage.jsx'

const SellerRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/register' element={<SellerRegister />} />
        <Route path='/login' element={<SellerLogin />} />
        <Route path='/register/buisness' element={<BusinessDetailsForm />} />
        <Route element={<SellerProtectedRouter />}>
          <Route path='/*' element={<Seller />} />
          <Route path='/products/add' element={<ProductCreate />} />
          <Route path='/products/select-category' element={<SelectCategoryPage />} />
          <Route path='/products/edit/:productId' element={<EditProductPage />} />
          {/* <Route path='/products/fetch' element={<ProductList />} /> */}
        </Route>
      </Routes>
    </div>
  )
}

export default SellerRouter
