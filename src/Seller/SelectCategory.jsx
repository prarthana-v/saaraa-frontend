import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../State/CategorySlice';

const SelectCategoryPage = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearchChange = (e) => setSearch(e.target.value.toLowerCase());

  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(search)
  );

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-light">
      <div className="container rounded h-[100vh]">
        <Box sx={{ display: 'flex', p: 3, gap: 2 }}>
          {/* Left Column: Categories */}
          <Box sx={{ flex: 1 }} className="bg-white p-3">
            <Typography
              variant="h5"
              className="bg-light p-3 opacity-70 poppins"
              sx={{ mb: 2, fontWeight: 600 }}
            >
              Categories
            </Typography>
            <List>
              {loading ? (
                <Typography>Loading categories...</Typography>
              ) : error ? (
                <Typography color="error">Error: {error}</Typography>
              ) : (
                filteredCategories.map((category) => (
                  // console.log("filtered", category),
                  <ListItemButton
                    key={category._id}
                    onClick={() => handleCategoryClick(category)}
                    selected={selectedCategory == category}
                    className="border-bottom"
                  >
                    <ListItemText primary={category.categoryName} />
                  </ListItemButton>
                ))
              )}
            </List>
          </Box>

          {/* Add Product Column */}
          <Box sx={{ flex: 2 }} className="bg-white p-3">
            {selectedCategory ? (
              <>
                <Typography
                  variant="h5"
                  sx={{ mb: 2, fontWeight: 600 }}
                  className="poppins"
                >
                  Selected Category: {selectedCategory.categoryName}
                </Typography>
                <Link to={'/seller/products/add'} state={selectedCategory} >
                  <Button variant="contained" color="primary" sx={{ width: 'fit-content' }}>
                    Add Product
                  </Button>
                </Link>

              </>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                Please select a category to add a product.
              </Typography>
            )}
          </Box>
        </Box>
      </div>
    </div >
  );
};

export default SelectCategoryPage;
