import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const LoginSuperadmin = lazy(() => import('../superAdmin/Components/LoginSuperadmin'));
const SuperAdminDashboard = lazy(() => import('../superAdmin/Components/SuperAdminDashboard'));
const SuperAdminProtectedRoute = lazy(() => import('../superAdmin/ProtectedPages/SuperAdminProtectedRoute'));

// import CategoriesPage from '../superAdmin/categoryAdd/CategoriesPage'

const SuperAdminRouter = () => {
  return (
    <div>
      <Suspense fallback={<div className="spinner-container">
        <div className="spinner"></div></div>}>
        <Routes>
          <Route path='/login' element={<LoginSuperadmin />} />
          <Route element={<SuperAdminProtectedRoute />} >
            <Route path='/*' element={<SuperAdminDashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default SuperAdminRouter
