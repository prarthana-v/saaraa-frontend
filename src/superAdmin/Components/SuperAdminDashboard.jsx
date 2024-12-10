import React from 'react'
import { Route, Routes } from 'react-router-dom';
import CategoriesPage from '../categoryAdd/CategoriesPage';
import SuperAdminSideBar from './SuperAdminSideBar';
import AddCategoryForm from '../categoryAdd/AddCategory';
import EditCategoryForm from '../categoryAdd/EditCategory'
import SubcategoriesPage from '../SubCategoryAdd/SubcategoriesPage';
import AddSubcategoryForm from '../SubCategoryAdd/AddSubcategoryForm';
import EditSubcategoryForm from '../SubCategoryAdd/EditSubCategory';
import BannerPage from '../Banners/BannerPage';
import AddBannerPage from '../Banners/AddBannerPage';
import ManageUsers from '../Users/ManageUsers';
import ManageSellers from '../Sellers/ManageSellers';

const SuperAdminDashboard = () => {
  return (
    <div className='flex'>
      <div className="w-[20%] bg-gray-800">
        <SuperAdminSideBar />
      </div>
      <div className='w-[80%] bg-gray-700'>
        <Routes>
          <Route path='/categories' element={<CategoriesPage />} />
          <Route path='/categories/add' element={<AddCategoryForm />} />
          <Route path='/categories/edit/:id' element={<EditCategoryForm />} />
          <Route path='/subcategories' element={<SubcategoriesPage />} />
          <Route path='/subcategories/add' element={<AddSubcategoryForm />} />
          <Route path='/subcategories/edit/:id' element={<EditSubcategoryForm />} />
          <Route path='/banners' element={<BannerPage />} />
          <Route path='/banners/add' element={<AddBannerPage />} />
          <Route path='/manageusers' element={<ManageUsers />} />
          <Route path='/managesellers' element={<ManageSellers />} />
        </Routes>
      </div>
    </div>
  )
}

export default SuperAdminDashboard
