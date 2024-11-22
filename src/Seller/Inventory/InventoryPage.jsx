import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Tabs,
  Tab,
  MenuItem,
  Select,
} from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../State/ProductSlice";
import { fetchCategories } from "../../State/CategorySlice";
import { useNavigate } from "react-router-dom";

const InventoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.category);

  const [stockFilter, setStockFilter] = useState("All Stock");
  const [category, setCategory] = useState("");
  const [tab, setTab] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Filter products based on tab, stockFilter, and category
  useEffect(() => {
    let filtered = [...products];

    // Filter by tab
    if (tab === 0) {
      filtered = filtered.filter((product) => product.status === "active");
    } else if (tab === 1) {
      filtered = filtered.filter((product) => product.status === "pending");
    } else if (tab === 2) {
      filtered = filtered.filter((product) => product.status === "paused");
    }

    // Apply stock filter
    if (stockFilter === "Out of Stock") {
      filtered = filtered.filter((product) => product.stock === 0);
    } else if (stockFilter === "Low Stock") {
      filtered = filtered.filter((product) => product.stock > 0 && product.stock < 10);
    }

    // Apply category filter
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    setFilteredProducts(filtered);
  }, [products, tab, stockFilter, category]); // Added tab to dependency array

  const handleAddProduct = () => {
    navigate("/seller/products/select-category");
  };

  const handleEditProduct = (productId) => {
    navigate(`/seller/products/update-product/${productId}`);
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Inventory</h1>
        <div className="flex gap-4">
          <TextField
            placeholder="Search SKU/Product"
            size="small"
            InputProps={{ endAdornment: <Search /> }}
          />
          <Button
            variant="contained"
            onClick={handleAddProduct}
            startIcon={<Add />}
            className="bg-blue-600 text-white"
          >
            Add Product
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onChange={(_, value) => setTab(value)} textColor="primary" indicatorColor="primary">
        {["Active", "Pending", "Paused"].map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>

      {/* Filters */}
      <div className="flex gap-4 mt-4">
        {/* Stock Filter */}
        <Select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)} size="small">
          {["All Stock", "Out of Stock", "Low Stock"].map((filter, i) => (
            <MenuItem key={i} value={filter}>
              {filter}
            </MenuItem>
          ))}
        </Select>

        {/* Category Filter */}
        <Select value={category} onChange={(e) => setCategory(e.target.value)} size="small">
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded mt-6">
        <Table>
          <TableHead>
            <TableRow>
              {["Product Name", "SKU", "Price", "Stock", "Category", "Status", "Actions"].map(
                (head, i) => (
                  <TableCell key={i} className="font-semibold">
                    {head}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>'-{product.sku}'</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.categoryName || "N/A"}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-sm ${product.status === "active"
                      ? "bg-green-100 text-green-800"
                      : product.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {product.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" color="primary" onClick={() => handleEditProduct(product._id)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryPage;
