import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../State/CategorySlice";

const CategoriesPage = () => {
  const navigate = useDispatch()
  const dispatch = useDispatch()
  useSelector((state) => console.log(state.category))
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      image:
        "https://via.placeholder.com/50", // Replace with actual image URL
    },
    {
      id: 2,
      name: "Fashion",
      image:
        "https://via.placeholder.com/50", // Replace with actual image URL
    },
    {
      id: 3,
      name: "Home & Kitchen",
      image:
        "https://via.placeholder.com/50", // Replace with actual image URL
    },
  ]);

  const handleEdit = (id) => {
    alert(`Edit category with ID: ${id}`);
    // Implement Edit functionality here
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((category) => category.id !== id));
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
                  key={category.id}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="p-2">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-12 h-12 rounded-md"
                    />
                  </td>
                  <td className="p-2">{category.id}</td>
                  <td className="p-2">{category.name}</td>
                  <td className="p-2 flex items-center space-x-4">
                    <button
                      onClick={() => handleEdit(category.id)}
                      className="text-yellow-400 hover:text-yellow-600 text-xl"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
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
