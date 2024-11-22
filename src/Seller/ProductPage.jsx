import React, { useState } from "react";
import { Box, Button, Grid, TextField, Select, MenuItem, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import ProductList from "./ProductList";

const SellerProductPage = () => {
  // Mock data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      stock: 15,
      price: 299.99,
    },
    {
      id: 2,
      name: "Running Shoes",
      category: "Fashion",
      stock: 5,
      price: 99.99,
    },
    {
      id: 3,
      name: "Smart Watch",
      category: "Electronics",
      stock: 0,
      price: 199.99,
    },
    {
      id: 4,
      name: "Sunglasses",
      category: "Accessories",
      stock: 20,
      price: 49.99,
    },
  ]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Filtered Products
  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterCategory ? product.category === filterCategory : true)
    );
  });

  // Handlers
  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleCategoryChange = (e) => setFilterCategory(e.target.value);

  return (
    <div className="">
      <div className="">
        <Box sx={{ p: 3 }}>
          {/* Overview Section */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: "#1a73e8",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">Total Products</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {products.length}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: "#28a745",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">Active Products</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {products.filter((product) => product.stock > 0).length}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">Out of Stock</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {products.filter((product) => product.stock === 0).length}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Action and Filter Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            {/* Add Product Button */}
            <Button component={NavLink} to='/seller/products/select-category' variant="contained" color="primary" startIcon={<Add />}>
              Add Product
            </Button>

            {/* Search and Filter */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search products"
                value={search}
                onChange={handleSearchChange}
              />
              <Select
                value={filterCategory}
                onChange={handleCategoryChange}
                displayEmpty
                size="small"
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Fashion">Fashion</MenuItem>
                <MenuItem value="Accessories">Accessories</MenuItem>
              </Select>
            </Box>
          </Box>

          <ProductList />
        </Box>
      </div>
    </div>
  );
};

export default SellerProductPage;
