// src/components/SellerProtectedRouter.js
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const apiurl = import.meta.env.VITE_API_URL;


const checkAuth = async () => {
  try {
    console.log('avo che');
    const response = await axios.get(`${apiurl}/seller/check-auth`, {
      withCredentials: true,
    });
    return response.data.success;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return false;
  }
};


const SellerProtectedRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const verifyAuth = async () => {
      const auth = await checkAuth();
      setIsAuthenticated(auth);
      setLoading(false);
    };

    verifyAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  // If seller is authenticated, render the protected routes
  return isAuthenticated ? <Outlet /> : <Navigate to="/seller/login" replace />;
};


export default SellerProtectedRouter;
