import React from 'react'
import { Routes, Route } from 'react-router-dom';
import ProductPage from './ProductPage.jsx'
import ProductCreate from './ProductCreate.jsx';
import Dashboard from './Dashboard.jsx';
import ProductList from './ProductList.jsx';
import Sidebar from './Sidebar.jsx';
import SelectCategoryPage from './SelectCategory.jsx';
import { Inventory } from '@mui/icons-material';
import InventoryPage from './Inventory/InventoryPage.jsx';
import OrderPage from './OrderPage.jsx';
import SellerProductPage from './ProductPage.jsx';

const Seller = () => {

  return (
    <div>
      <div className='flex'>
        <div className='flex-column w-[16%]  border '>
          <Sidebar />
        </div>

        <div className='w-[84%]'>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<SellerProductPage />} />
            <Route path='/inventory' element={<InventoryPage />} />
            <Route path='/orders' element={<OrderPage />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Seller
