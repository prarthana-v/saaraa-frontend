import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editSubcategory, fetchSubcategories } from '../../State/SubCategorySlice';
import { fetchCategories } from '../../State/CategorySlice';
import { toast } from 'react-toastify';

const EditSubcategoryForm = () => {
  const { id } = useParams(); // Get the subcategory ID from the URL
  // console.log(id, 'id')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { subcategories } = useSelector((state) => state.subcategory);
  const { categories } = useSelector((state) => state.category);

  const [subcategoryName, setSubcategoryName] = useState('');
  const [subcategoryImage, setSubcategoryImage] = useState(null);
  const [imageFile, setImageFile] = useState(null)
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    dispatch(fetchSubcategories());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    // Fetch the subcategory details based on the ID
    const subcategory = subcategories.find((sub) => sub._id === id);
    if (subcategory) {
      setSubcategoryName(subcategory?.subcategoryName);
      setCategoryId(subcategory?.categoryId?._id || '');
      setSubcategoryImage(subcategory?.image || null);
    }
  }, [id, subcategories]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setSubcategoryImage(objectURL);
      setImageFile(file)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subcategoryName || !categoryId) {
      toast.error('Please fill all the required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('subcategoryName', subcategoryName.toLowerCase());
    formData.append('categoryId', categoryId);

    if (imageFile) {
      formData.append('subcategoryImage', imageFile);
    }

    // Log FormData contents
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    console.log('Updated Data:', { subcategoryName, categoryId, subcategoryImage });
    try {
      const result = await dispatch(editSubcategory({ id, formData }));
      console.log(result, 'result of edit subcat')
      if (result?.payload?.success === true) {
        toast.success('Subcategory updated successfully!');
        navigate('/superadmin/subcategories');
      } else {
        toast.error('Failed to update the subcategory. Please try again.');
      }
      setSubcategoryName('');
      setSubcategoryImage(null);
      setImageFile(null);
      setCategoryId('');
    } catch (error) {
      console.error(error);
      setError('Failed to update category, please try again!');
    }

  };

  return (
    <div className="relative top-20 w-full max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg">
      <div className="container mx-auto mt-6 px-4">
        <h2 className="text-center text-2xl font-bold text-white mb-6">Edit Subcategory</h2>
        <form onSubmit={handleSubmit} className="p-6 rounded-lg space-y-6">
          {/* Subcategory Name */}
          <div className="flex items-center space-x-4">
            <label htmlFor="subcategoryName" className="w-1/4 text-white font-semibold text-right">
              Subcategory Name
            </label>
            <input
              type="text"
              id="subcategoryName"
              value={subcategoryName}
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
              value={categoryId}
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

          {/* Subcategory Image */}
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
              />
              {subcategoryImage && (
                <div className="mt-4 w-[6rem] h-[6rem] flex items-center justify-center bg-gray-700 rounded-md">
                  <img
                    src={subcategoryImage}
                    alt="Subcategory Preview"
                    className="object-contain rounded-md w-[6rem] h-[6rem] border border-gray-600"
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubcategoryForm;
