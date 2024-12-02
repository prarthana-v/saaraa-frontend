import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginSuperadmin from '../superAdmin/Components/LoginSuperadmin'
import SuperAdminDashboard from '../superAdmin/Components/SuperAdminDashboard'
import SuperAdminProtectedRoute from '../superAdmin/ProtectedPages/SuperAdminProtectedRoute'
import CategoriesPage from '../superAdmin/categoryAdd/CategoriesPage'

const SuperAdminRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<LoginSuperadmin />} />
        <Route element={<SuperAdminProtectedRoute />} >
          <Route path='/*' element={<SuperAdminDashboard />} />
        </Route>
      </Routes>
    </div>
  )
}

export default SuperAdminRouter
