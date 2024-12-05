import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmDelete from '../../Middleware/ConfirmDelete';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
const apiurl = import.meta.env.VITE_API_URL;

const BannerTable = () => {
  const [banners, setBanners] = useState([]);

  // Fetch banners from the server
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${apiurl}/superadmin/banners`, {
          withCredentials: true,
        });
        console.log(response.data.banners);

        if (response.data.success) {
          setBanners(response.data.banners || []);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error('Failed to fetch banners:', error);
        toast.error('Failed to fetch banners');
      }
    };
    fetchBanners();
  }, []);
  // Persist reordered banners to the backend
  const persistReorder = async (updatedBanners) => {
    try {
      // Prepare the payload with the correct format
      const sortedOrder = updatedBanners.map((banner, index) => ({
        _id: banner._id,      // Use "_id" as required by the backend
        sortOrder: index,     // Start from 0 as required
      }));
      console.log(sortedOrder)
      // Send the array directly
      const response = await axios.put(`${apiurl}/superadmin/reorder-banner`, sortedOrder, {
        withCredentials: true, // Include credentials if required
      });

      console.log(response.data);
      toast.success('Banner order updated successfully!');
    } catch (error) {
      console.error('Failed to update banner order:', error);
      toast.error('Failed to update banner order.');
    }
  };

  // Function to move a banner up
  const moveUp = (index) => {
    if (index > 0) {
      const updatedBanners = [...banners];
      const temp = updatedBanners[index];
      updatedBanners[index] = updatedBanners[index - 1];
      updatedBanners[index - 1] = temp;
      setBanners(updatedBanners);
      persistReorder(updatedBanners); // Call persistReorder after updating state
    }
  };

  // Function to move a banner down
  const moveDown = (index) => {
    if (index < banners.length - 1) {
      const updatedBanners = [...banners];
      const temp = updatedBanners[index];
      updatedBanners[index] = updatedBanners[index + 1];
      updatedBanners[index + 1] = temp;
      setBanners(updatedBanners);
      persistReorder(updatedBanners); // Call persistReorder after updating state
    }
  };

  const handleDeleteBanner = async (bannerId) => {
    const confirm = await ConfirmDelete(bannerId)
    if (confirm) {
      try {
        const response = await axios.delete(`${apiurl}/superadmin/delete-banner/${bannerId}`, {
          withCredentials: true, // Include credentials if required
        })

        console.log(response);

        if (response.data.success === true) {
          toast.success('Banner deleted successfully!');
          setBanners((prevBanners) => prevBanners.filter((banner) => banner._id !== bannerId));
        } else {
          toast.error(response.data.message || 'Failed to delete the banner.');
        }
      } catch (error) {
        console.log("Failed to delete banner", error);
        toast.error("internal server error!!")
      }
    }

  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className='flex justify-between items-center mb-10'>
        <h1 className="text-3xl font-bold text-white ">Manage Banners</h1>
        <div>
          <Link
            to={'/superadmin/banners/add'}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md flex items-center no-underline me-3"
          >
            <FaPlus className="mr-2" />
            Add Banner
          </Link>
        </div>
      </div>
      <table className="w-full bg-gray-800 text-white rounded-md overflow-hidden">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Order</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(banners) && banners.length > 0 ? (
            banners.map((banner, index) => (
              <tr key={banner._id} className="border-b border-gray-600">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  <img
                    src={banner.image}
                    alt={banner.title || 'Banner'}
                    className="w-40 h-auto object-cover rounded-md"
                  />
                </td>
                <td className="p-3">{banner.title || 'Untitled'}</td>
                <td className="p-3">{index + 1}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => moveUp(index)}
                    className={`px-3 py-1 rounded text-white ${index === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-400'}`}
                    disabled={index === 0}
                  >
                    Up
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    className={`px-3 py-1 rounded text-white ${index === banners.length - 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-400'}`}
                    disabled={index === banners.length - 1}
                  >
                    Down
                  </button>
                  <button onClick={() => handleDeleteBanner(banner._id)} className={`px-3 py-1 rounded text-white bg-red-600 hover:bg-red-500`}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-3">No banners available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BannerTable;
