import React from 'react'
import { Route, Routes } from 'react-router-dom';
import CategoriesPage from '../categoryAdd/CategoriesPage';
import SuperAdminSideBar from './SuperAdminSideBar';
import AddCategoryForm from '../categoryAdd/AddCategory';
import EditCategoryForm from '../categoryAdd/EditCategory'
import SuperAdminProtectedRoute from '../ProtectedPages/SuperAdminProtectedRoute';

const SuperAdminDashboard = () => {
  return (
    <div className='flex'>
      <div className="w-[20%]">
        <SuperAdminSideBar />
      </div>
      <div className='w-[80%] bg-gray-700'>
        <Routes>
          <Route path='/categories' element={<CategoriesPage />} />
          <Route path='/categories/add' element={<AddCategoryForm />} />
          <Route path='/categories/edit/:id' element={<EditCategoryForm />} />
        </Routes>
      </div>
    </div>
  )
}

export default SuperAdminDashboard
