import React, { useEffect, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from '../../State/CategorySlice';
import { addSubcategory } from '../../State/SubCategorySlice';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';


const AddSubcategoryForm = () => {
  const [subcategoryName, setSubcategoryName] = useState('');
  const [subcategoryImage, setSubcategoryImage] = useState(null);
  const [CategoryId, setCategoryId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { categories } = useSelector((state) => (state.category))
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  // Handle image upload preview

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setSubcategoryImage(objectURL);
    }
  };

  // Revoke the object URL when the component unmounts or the image changes
  useEffect(() => {
    return () => {
      if (subcategoryImage) {
        URL.revokeObjectURL(subcategoryImage);
      }
    };
  }, [subcategoryImage]);


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subcategoryName || !subcategoryImage || !CategoryId) {
      toast.error('All fields are required!');
      return;
    }

    const formData = new FormData();
    formData.append('categoryId', CategoryId);
    formData.append('subcategoryName', subcategoryName.toLowerCase());
    formData.append('subcategoryImage', e.target.subcategoryImage.files[0]);

    try {
      const result = await dispatch(addSubcategory(formData)).unwrap(); // Unwraps the action result
      console.log('Subcategory added successfully:', result);
      toast.success('Subcategory added successfully!');

      // Clear form fields
      setSubcategoryName('');
      setCategoryId('');
      if (subcategoryImage) {
        URL.revokeObjectURL(subcategoryImage);
        setSubcategoryImage(null);
      }

      navigate('/superadmin/subcategories');
    } catch (error) {
      console.error('Error adding subcategory:', error);
      toast.error('Failed to add subcategory.');
    }
  };


  return (
    <div className='relative top-20 w-full max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg'>
      <div className="container mx-auto mt-6 px-4">
        <form onSubmit={handleSubmit} className="p-6 rounded-lg space-y-6">
          {/* Subcategory Name */}
          <div className="flex items-center space-x-4">
            <label htmlFor="subcategoryName" className="w-1/4 text-white font-semibold text-right">
              Subcategory Name
            </label>
            <input
              type="text"
              id="subcategoryName"
              value={subcategoryName || ""}
              onChange={(e) => setSubcategoryName(e.target.value)}
              className="flex-1 p-2 bg-gray-700 text-white rounded-md"
              placeholder="Enter subcategory name"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center space-x-4">
            <label htmlFor="categoryName" className="w-1/4 text-white font-semibold text-right">
              Category Name
            </label>
            <select
              id="categoryName"
              value={CategoryId || ""}
              onChange={(e) => setCategoryId(e.target.value)}
              className="flex-1 p-2 bg-gray-700 text-white rounded-md"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Image Upload */}
          <div className="flex items-start justify-start space-x-4">
            <label htmlFor="subcategoryImage" className="w-1/4 block text-white flex justify-end font-semibold">
              Upload Image
            </label>
            <div className="w-2/3">
              <input
                type="file"
                id="subcategoryImage"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-600 file:text-white"
                required
              />
              {/* Image Preview */}
              {subcategoryImage && (
                <div className="mt-4 w-[6rem] h-[6rem] flex items-center justify-center bg-gray-700 rounded-md">
                  <img
                    src={subcategoryImage}
                    alt="Subcategory Preview"
                    className="object-cover rounded-md w-[6rem] h-[6rem] border border-gray-600"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md"
            >
              Add Subcategory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubcategoryForm;
