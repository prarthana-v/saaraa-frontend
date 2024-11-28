import React, { useState, useEffect } from 'react';
// import { fetchProducts } from '../State/ProductSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from '@mui/material';
import ProductViewModal from './components/ProductViewModal';
const apiurl = import.meta.env.VITE_API_URL
import Cookies from "js-cookie";
import axios from 'axios'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        // Get token from cookies or session (replace with actual token retrieval logic)
        const token = Cookies.get("sellertoken"); // Example: Fetch from localStorage or cookies
        if (!token) {
          console.log("token nathi fetch products ma!!")
        }

        // Make API call to fetch products
        const response = await axios.get(`${apiurl}/product/getproductsbyseller`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request header
          },
        });

        // Update local state with fetched products
        setProducts(response.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchProducts();
  }, []);


  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{`${error}`}</div>;
  if (products.length === 0) return <div>No products found.</div>;


  return (
    <div className="product-list">
      <h1>Product List</h1>
      {/* 
      {loading && <p>Loading products...</p>}
      {error && <p>Error: {error}</p>} */}
      {/* {products.length === 0 && !loading && !error && <p>No products found.</p>} */}

      {!loading && !error && products.length > 0 && (
        <TableContainer component={Paper} className="shadow-md">
          <Table>
            <TableHead>
              <TableRow className="bg-gray-200">
                <TableCell className="font-semibold">Image</TableCell>
                <TableCell className="font-semibold">Category</TableCell>
                <TableCell className="font-semibold">Name</TableCell>
                <TableCell className="font-semibold">Product_id</TableCell>
                <TableCell className="font-semibold">Status</TableCell>
                <TableCell className="font-semibold">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  {/* Product Image */}
                  <TableCell>
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name || "Product"}
                        className="h-12 w-12 object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-gray-500">No image</span>
                    )}
                  </TableCell>

                  {/* Product Category */}
                  <TableCell>{product.categoryName || "No category"}</TableCell>

                  {/* Product Details */}
                  <TableCell>
                    <div>
                      <span className="font-medium text-gray-800">{product.productName || "No name"}</span>
                      <br />
                      <span className="text-sm text-gray-500">{product.description || "No description"}</span>
                    </div>
                  </TableCell>

                  {/* Product ID */}
                  <TableCell>{product._id}</TableCell>

                  {/* Status Button */}
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      disabled
                      sx={{
                        color: (theme) => theme.palette.error.main,
                        borderColor: (theme) => theme.palette.error.main,
                        "&.Mui-disabled": {
                          color: (theme) => theme.palette.error.main,
                          borderColor: (theme) => theme.palette.error.main,
                        },
                      }}
                    >
                      Pending
                    </Button>
                  </TableCell>

                  {/* Product Modal */}
                  <TableCell>
                    <ProductViewModal product={product} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      )
      }
    </div >
  );
};


export default ProductList;
