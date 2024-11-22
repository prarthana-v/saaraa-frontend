import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../State/ProductSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from '@mui/material';
import ProductViewModal from './components/ProductViewModal';

const ProductList = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);
  useSelector((state) => console.log(state.products));
  useEffect(() => {
    dispatch(fetchProducts()); // Fetch products on initial render
  }, [dispatch]);

  // Debugging: log the products, loading, and error state
  console.log("Products:", products);
  console.log("Loading:", loading);
  console.log("Error:", error);

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
                console.log(product),
                <TableRow TableRow key={product._id} >
                  <TableCell>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell>{product.categoryName}</TableCell>
                  <TableCell>
                    <div>
                      <span className="font-medium text-gray-800">{product.productName}</span>
                      <br />
                      <span className="text-sm text-gray-500">{product.description}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product._id}</TableCell>
                  <TableCell><Button variant='outlined' color='error' disabled sx={{
                    color: (theme) => theme.palette.error.main,
                    borderColor: (theme) => theme.palette.error.main,
                    '&.Mui-disabled': {
                      color: (theme) => theme.palette.error.main,
                      borderColor: (theme) => theme.palette.error.main,
                    },
                  }}>Pending</Button></TableCell>
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
