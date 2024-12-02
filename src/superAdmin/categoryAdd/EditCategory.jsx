import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchCategoryById, editCategory } from '../../State/CategorySlice'; // Assuming editCategory is available
import { useNavigate, useParams } from 'react-router-dom';

const EditCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { category, loading, error: categoryError } = useSelector((state) => state?.category);
  // const category = categorydetails.data
  console.log(category?.data)

  // Fetch category data when component mounts
  useEffect(() => {
    if (id) {
      dispatch(fetchCategoryById(id)); // Fetch category by ID when the component mounts
    }
  }, [id, dispatch]);

  // Update state once category data is available
  useEffect(() => {
    if (category) {
      setCategoryName(category?.data?.categoryName || ''); // Set category name to state
      setCategoryImage(category?.data?.image || null); // Set the image or null if no image is available
    }
  }, [category]); // This effect will run whenever category changes

  // Handle category name change
  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  // Handle category image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName || !categoryImage) {
      setError('Both category name and image are required!');
      return;
    }
    const lowercasedCategoryName = categoryName.toLowerCase(); // Converts to lowercase



    const formData = new FormData();
    formData.append('categoryName', lowercasedCategoryName);
    formData.append('categoryImage', e.target.categoryImage.files[0]);

    // Log FormData contents
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    try {
      const result = await dispatch(editCategory({ id, formData }));
      if (result?.payload?.success === true) {
        toast.success('Category updated successfully!');
        navigate('/superadmin/categories');
      } else {
        toast.error('Failed to update the category. Please try again.');
      }
      setCategoryName('');
      setCategoryImage(null); // Reset image after submit
      setError('');
    } catch (error) {
      console.error(error);
      setError('Failed to update category, please try again!');
    }
  };

  if (loading) return <p>Loading...</p>; // Display loading message if fetching data
  if (categoryError) return <p>{categoryError}</p>; // Display error message if there's an error

  return (
    <div className="relative top-20 w-full max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl text-white mb-4">Edit Category</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-gray-800 p-6 rounded-md shadow-md space-y-6"
      >
        {/* Category Name Input */}
        <div className="flex items-center space-x-4">
          <label
            htmlFor="categoryName"
            className="w-1/3 text-white font-medium text-right"
          >
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            value={categoryName || ""}
            onChange={handleCategoryNameChange}
            className="flex-1 p-2 rounded-md bg-gray-700 text-white"
            placeholder="Enter category name"
            required
          />
        </div>

        {/* Image Upload and Preview */}
        <div className="flex items-center justify-evenly space-x-4">
          {/* File Input */}
          <div className="flex-3 ms-3">
            <label htmlFor="categoryImage" className="block text-white font-medium mb-2">
              Upload Image
            </label>
            <input
              type="file"
              id="categoryImage"
              name="categoryImage"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-gray-600 file:text-white"
            />
          </div>

          {/* Image Preview */}
          <div className="w-[6rem] h-[6rem] flex items-center justify-center bg-gray-700 rounded-md border border-gray-600">
            {categoryImage ? (
              <img
                src={categoryImage}
                alt="Category Preview"
                className="object-cover w-full h-full rounded-md"
              />
            ) : (
              <p className="text-gray-400 text-sm">No Image</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md"
          >
            Update Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategoryForm;
