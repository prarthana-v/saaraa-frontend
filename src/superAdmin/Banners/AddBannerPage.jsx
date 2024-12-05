import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const apiurl = import.meta.env.VITE_API_URL;

const AddBannerPage = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Preview selected image
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      toast.error('Please provide a title and an image!');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    setLoading(true);
    try {
      const response = await axios.post(`${apiurl}/superadmin/add-banner`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success('Banner added successfully!');
        navigate('/superadmin/banners'); // Navigate back to the banners page
      } else {
        toast.error('Failed to add banner. Please try again.');
      }
    } catch (error) {
      console.error('Error adding banner:', error);
      toast.error('An error occurred while adding the banner.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">Add New Banner</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-gray-800 p-6 rounded-md shadow-md space-y-6"
      >
        {/* Title Input */}
        <div className="flex items-center space-x-4">
          <label
            htmlFor="title"
            className="w-1/3 text-white font-medium text-right"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="flex-1 p-2 rounded-md bg-gray-700 text-white"
            placeholder="Enter banner title"
            required
          />
        </div>

        {/* Image Input */}
        <div className="flex items-center space-x-4">
          <label
            htmlFor="image"
            className="w-1/3 text-white font-medium text-right"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="flex-1 text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-gray-600 file:text-white"
            required
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="flex justify-center">
            <img
              src={preview}
              alt="Selected Banner"
              className="w-full h-auto object-contain rounded-md"
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Banner'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBannerPage;
