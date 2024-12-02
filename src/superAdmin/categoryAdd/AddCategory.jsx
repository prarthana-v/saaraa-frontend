import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
import { addCategory } from '../../State/CategorySlice';


const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [error, setError] = useState('');
  const dispatch = useDispatch()
  const [success, setSuccess] = useState('');

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
    console.log(categoryImage, categoryName)
    // Check if both fields are filled
    if (!categoryName || !categoryImage) {
      setError('Both category name and image are required!');
      return;
    }

    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('categoryImage', e.target.categoryImage.files[0]);

    try {
      const result = await dispatch(addCategory(formData))
      console.log(result, 'result of categories')

      // toast.success('Category added successfully!');
      setCategoryName('');
      setCategoryImage(null);
      setError('');
    } catch (error) {
      setError('Failed to add category, please try again!');
    }
  };

  return (
    <div className="relative top-20 w-full max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl text-white mb-4">Add New Category</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}
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
            value={categoryName}
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
              required
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
            Add Category
          </button>
        </div>
      </form>


    </div>
  );
};

export default AddCategoryForm;
