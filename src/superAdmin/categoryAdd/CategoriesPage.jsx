import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaPlus, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCategories, removeCategory, updateCategoryOrder } from "../../State/CategorySlice";
import axios from "axios";
import { toast } from "react-toastify";
const apiurl = import.meta.env.VITE_API_URL;

const CategoriesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state?.category);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this category?");
      if (!confirmDelete) return;

      const response = await axios.delete(`${apiurl}/category/delete-category/${id}`, {
        withCredentials: true, // Ensure credentials (cookies) are sent
      });
      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
        dispatch(removeCategory(id));
      } else {
        toast.error("Failed to delete the category. Please try again.");
      }
    } catch (error) {
      console.error("Error while deleting the category:", error);
      alert("An error occurred while deleting the category.");
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Inside your CategoriesPage component, in reorderCategory function
  const reorderCategory = async (categoryId, direction) => {
    const updatedCategories = [...categories];
    const index = updatedCategories.findIndex((category) => category._id === categoryId);
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < updatedCategories.length) {
      const temp = updatedCategories[index];
      updatedCategories[index] = updatedCategories[newIndex];
      updatedCategories[newIndex] = temp;

      try {
        // Update Redux store with new category order
        let result = await dispatch(updateCategoryOrder(updatedCategories.map((category) => category._id)));
        console.log(result, 'reorder response');
        if (result?.meta?.requestStatus === "fulfilled") {
          toast.success('Categories reordered successfully!');
        } else {
          toast.error('Failed to reorder categories.');
        }
      } catch (error) {
        console.error('Error reordering categories:', error);
        toast.error('An error occurred while reordering categories.');
      }
    }
  };


  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Categories</h1>
        <div className="flex">
          <Link
            to={'/superadmin/subcategories/add'}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md flex items-center no-underline me-3"
          >
            <FaPlus className="mr-2" />
            Add Subcategory
          </Link>
          <Link
            to={'/superadmin/categories/add'}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md flex items-center no-underline"
          >
            <FaPlus className="mr-2" />
            Add Category
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-gray-800 p-2 rounded-lg ">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="p-3 text-center ">Image</th>
              <th className="p-3 text-center ">ID</th>
              <th className="p-3 text-center ">Category Name</th>
              <th className="p-3 text-center ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr
                  key={category._id}
                  className="border-b border-gray-700 hover:bg-gray-700 items-center"
                >
                  <td className="text-center p-2">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-14 h-14 object-contain rounded-md"
                    />
                  </td>
                  <td className="text-center p-2">{category._id}</td>
                  <td className="text-center p-2">{category.categoryName}</td>
                  <td className=" px-2 flex mt-2 justify-center space-x-4">

                    <Link to={`/superadmin/categories/edit/${category._id}`} className="px-4 py-3 bg-yellow-500 hover:bg-yellow-400 text-white rounded-md mr-2 text-lg">
                      <FaEdit />
                    </Link>

                    <button onClick={() => handleDelete(category._id)} className="px-4 py-3 bg-red-600 hover:bg-red-500 text-white text-lg rounded-md">
                      <FaTrashAlt />
                    </button>

                    {/* Up Arrow */}
                    <button
                      onClick={() => reorderCategory(category._id, "up")}
                      disabled={index === 0} // Disable if it's the first item
                      className={`px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-md ${index === 0 ? 'cursor-not-allowed bg-gray-500' : ''
                        }`}
                    >
                      <FaArrowUp />
                    </button>

                    {/* Down Arrow */}
                    <button
                      onClick={() => reorderCategory(category._id, "down")}
                      disabled={index === categories.length - 1} // Disable if it's the last item
                      className={`px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-md ${index === categories.length - 1 ? 'cursor-not-allowed bg-gray-500' : ''
                        }`}
                    >
                      <FaArrowDown />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-2 text-center text-gray-400 italic">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesPage;
