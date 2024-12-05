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
import { fetchSubcategories } from '../State/SubCategorySlice';

const SelectCategoryPage = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const dispatch = useDispatch();
  const { categories, loading: categoryLoading, error: categoryError } = useSelector((state) => state.category);
  const { subcategories, loading: subcategoryLoading, error: subcategoryError } = useSelector((state) => state.subcategory);


  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubcategories());
  }, [dispatch]);

  const handleSearchChange = (e) => setSearch(e.target.value.toLowerCase());

  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(search)
  );

  const filteredSubcategories = selectedCategory
    ? subcategories.filter((sub) => sub.categoryId._id === selectedCategory._id)
    : [];
  console.log(filteredSubcategories)

  const handleCategoryClick = (category) => {
    console.log(category)
    setSelectedCategory(category);
    setSelectedSubcategory(null); // Reset subcategory selection
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  return (
    <div className="bg-light">
      <div className="container rounded h-[100vh]">
        <Box sx={{ display: 'flex', p: 3, gap: 2 }}>
          {/* Left Column: Categories */}
          <Box sx={{ flex: 1 }} className="bg-white p-3">
            <Typography
              variant="h5"
              className="poppins"
              sx={{ mb: 2, fontWeight: 600 }}
            >
              Categories
            </Typography>
            <List>
              {categoryLoading ? (
                <Typography>Loading categories...</Typography>
              ) : categoryError ? (
                <Typography color="error">Error: {categoryError}</Typography>
              ) : (
                filteredCategories.map((category) => (
                  <ListItemButton
                    key={category._id}
                    onClick={() => handleCategoryClick(category)}
                    selected={selectedCategory === category}
                    className="border-bottom"
                  >
                    <ListItemText primary={category.categoryName} />
                  </ListItemButton>
                ))
              )}
            </List>
          </Box>

          {/* Middle Column: Subcategories */}
          <Box sx={{ flex: 1 }} className="bg-white p-3">
            {selectedCategory ? (
              <>
                <Typography
                  variant="h5"
                  sx={{ mb: 2, fontWeight: 600 }}
                  className="poppins"
                >
                  Subcategories for: {selectedCategory.categoryName}
                </Typography>
                <List>
                  {subcategoryLoading ? (
                    <Typography>Loading subcategories...</Typography>
                  ) : subcategoryError ? (
                    <Typography color="error">Error: {subcategoryError}</Typography>
                  ) : filteredSubcategories.length > 0 ? (
                    filteredSubcategories.map((subcategory) => (
                      <ListItemButton
                        key={subcategory._id}
                        onClick={() => handleSubcategoryClick(subcategory)}
                        selected={selectedSubcategory === subcategory}
                        className="border-bottom"
                      >
                        <ListItemText primary={subcategory.subcategoryName} />
                      </ListItemButton>
                    ))
                  ) : (
                    <Typography>No subcategories available.</Typography>
                  )}
                </List>

              </>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                Please select a category to view subcategories.
              </Typography>
            )}
          </Box>

          {/* Right Column: Add Product */}
          <Box sx={{ flex: 1 }} className="bg-white p-3">
            {selectedSubcategory ? (
              <>
                <Typography
                  variant="h5"
                  sx={{ mb: 2, fontWeight: 600 }}
                  className="poppins"
                >
                  Selected Subcategory: {selectedSubcategory.subcategoryName}
                </Typography>
                <img
                  src={selectedSubcategory.image}
                  alt={selectedSubcategory.subcategoryName}
                  className="w-full h-96 object-contain rounded mb-4"
                />
                <div className='text-center'>
                  <Link
                    to={'/seller/products/add'}
                    state={{
                      category: selectedCategory,
                      subcategory: selectedSubcategory,
                    }}
                  >
                    <Button variant="contained" color="primary">
                      Add Product
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                Please select a subcategory to add a product.
              </Typography>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default SelectCategoryPage;
