import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy load components
const Seller = lazy(() => import('../Seller/Seller'));
const SellerRegister = lazy(() => import('../Seller/SellerAuth/RegisterSeller'));
const BusinessDetailsForm = lazy(() => import('../Seller/SellerAuth/BuissnessDetailsForm'));
const SellerLogin = lazy(() => import('../Seller/SellerAuth/LoginSeller'));
const SellerProtectedRouter = lazy(() => import('../Seller/protectedPage/SellerProtectedRouter.jsx'));
const ProductCreate = lazy(() => import('../Seller/ProductCreate.jsx'));
const SelectCategoryPage = lazy(() => import('../Seller/SelectCategory.jsx'));
const EditProductPage = lazy(() => import('../Seller/EditProductPage.jsx'));

const SellerRouter = () => {
  return (
    <div>
      <Suspense fallback={<div className="spinner-container">
        <div className="spinner"></div></div>}>
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
      </Suspense>
    </div>
  )
}

export default SellerRouter
