import React, { useState, useEffect } from "react";
import { Box, Button, Grid, TextField, Select, MenuItem, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import ProductList from "./ProductList";
import axios from "axios";
import Cookies from "js-cookie";

const SellerProductPage = () => {
  // Mock data
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {

        const response = await axios.get(`${apiUrl}/product/getproductsbyseller`, {
          withCredentials: true,
        });
        setProducts(response.data);
        console.log(response.data, 'prodyucts')
      } catch (err) {
        console.log(err)
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const productName = product.productName || "";
    const productSkuId = product.skuid || ""; // Ensure skuid exists
    const searchLower = search.toLowerCase();

    return (
      (productName.toLowerCase().includes(searchLower) ||
        productSkuId.toLowerCase().includes(searchLower)) &&
      (filterCategory ? product.category === filterCategory : true)
    );
  });
  console.log(filteredProducts)

  // Handlers
  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
    console.log(e.target.value);

  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{'error'}</div>;
  if (products?.length === 0) return <div>No products found.</div>;

  return (
    <div className="">
      <div className="p-6 space-y-6">
        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="py-3 bg-blue-600 text-white text-center rounded-lg">
            <h2 className="text-lg font-medium mb-1">Total Products</h2>
            <p className="text-2xl mb-1 font-bold">{products.length}</p>
          </div>
          <div className="py-3 bg-green-600 text-white text-center rounded-lg">
            <h2 className="text-lg font-medium mb-1">Active Products</h2>
            <p className="text-2xl mb-1 font-bold">{products.filter((product) => product.stock > 0).length}</p>
          </div>
          <div className="py-3 bg-red-600 text-white text-center rounded-lg">
            <h2 className="text-lg font-medium mb-1">Out of Stock</h2>
            <p className="text-2xl mb-1 font-bold">{products.filter((product) => product.stock === 0).length}</p>
          </div>
        </div>

        {/* Action and Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Add Product Button */}
          <NavLink
            to="/seller/products/select-category"
            className="bg-gray-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition no-underline"
          >
            Add Product
          </NavLink>

          {/* Search and Filter */}
          <div className="flex gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search products"
              value={search}
              onChange={handleSearchChange}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-300 focus:outline-none"
            />
            <select
              value={filterCategory}
              onChange={handleCategoryChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-300 focus:outline-none"
            >
              <option value="">All Categories</option>
              {[...new Set(products.map((product) => product.categoryName))].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product List */}
        <ProductList filteredProducts={filteredProducts} filterCategory={filterCategory} />
      </div>
    </div>
  );
};

export default SellerProductPage;
