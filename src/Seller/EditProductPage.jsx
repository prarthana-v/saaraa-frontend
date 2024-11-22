// EditProductPage.jsx
import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Select } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_URL;

const EditProductPage = () => {
  const { productId } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the product details and categories on page load
    const fetchData = async () => {
      try {
        const productRes = await axios.get(`${apiurl}/product/${productId}`);
        const categoriesRes = await axios.get(`${apiurl}/category/categories`);
        setProduct(productRes.data);
        setCategories(categoriesRes.data.categories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiurl}/product/edit/${productId}`, product);
      navigate("/seller/inventory"); // Redirect to inventory after editing
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Product Name"
          fullWidth
          value={product.productName}
          onChange={(e) => setProduct({ ...product, productName: e.target.value })}
        />
        <TextField
          label="SKU"
          fullWidth
          value={product.sku}
          onChange={(e) => setProduct({ ...product, sku: e.target.value })}
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <Select
          label="Category"
          fullWidth
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        >
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Stock"
          type="number"
          fullWidth
          value={product.stock}
          onChange={(e) => setProduct({ ...product, stock: e.target.value })}
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          fullWidth
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />
        <Button variant="contained" color="primary" type="submit">
          Update Product
        </Button>
      </form>
    </div>
  );
};

export default EditProductPage;
