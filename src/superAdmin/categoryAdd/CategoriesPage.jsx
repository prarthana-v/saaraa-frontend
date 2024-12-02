import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCategories, removeCategory } from "../../State/CategorySlice";
import axios from "axios";
import { toast } from "react-toastify";
const apiurl = import.meta.env.VITE_API_URL


const CategoriesPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state?.category)

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this category?");
      if (!confirmDelete) return;

      const response = await axios.delete(`${apiurl}/category/delete-category/${id}`, {
        withCredentials: true, // Ensure credentials (cookies) are sent
      });
      console.log(response, 'res delete')
      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
        dispatch(removeCategory(id))
      } else {
        toast.error("Failed to delete the category. Please try again.");
      }
    } catch (error) {
      console.error("Error while deleting the category:", error);
      alert("An error occurred while deleting the category.");
    }
  };

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Categories</h1>
        <Link
          to={'/superadmin/categories/add'}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md flex items-center no-underline"
        >
          <FaPlus className="mr-2" />
          Add Category
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-gray-800 p-2 rounded-lg shadow-lg">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">ID</th>
              <th className="p-3">Category Name</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr
                  key={category._id}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="p-2">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-14 h-14 object-contain rounded-md"
                    />
                  </td>
                  <td className="p-2">{category._id}</td>
                  <td className="p-2">{category.categoryName}</td>
                  <td className="p-2 flex items-center space-x-4">
                    <Link to={`/superadmin/categories/edit/${category._id}`}
                      className="text-yellow-400 hover:text-yellow-600 text-xl"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="text-red-500 hover:text-red-700 text-xl"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="p-2 text-center text-gray-400 italic"
                >
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
