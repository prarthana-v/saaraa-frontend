import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaPlus, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteSubcategory, fetchSubcategories, removeSubcategory, reorderSubcategories } from '../../State/SubCategorySlice';

const SubcategoriesPage = () => {
  const dispatch = useDispatch();
  const { subcategories } = useSelector((state) => state?.subcategory);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(fetchSubcategories());
  }, [dispatch]);

  useEffect(() => {
    setFilteredSubcategories(subcategories);
  }, [subcategories]);

  // Handle filtering by category
  const handleFilterChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category) {
      setFilteredSubcategories(
        subcategories.filter(
          (subcategory) =>
            subcategory.categoryId?._id === category || subcategory.categoryId === category
        )
      );
    } else {
      setFilteredSubcategories(subcategories);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this subcategory?");
      if (!confirmDelete) return;

      let result = await dispatch(deleteSubcategory(id));
      if (result?.data?.success === true) {
        toast.success("Subcategory deleted successfully !!");
        dispatch(removeSubcategory(id));
      } else {
        toast.error("Failed to delete the subcategory. Please try again.");
      }
    } catch (error) {
      console.error("Error while deleting the subcategory:", error);
      alert("An error occurred while deleting the subcategory.");
    }
  };

  // Dispatch reorder subcategories action
  const handleReorder = (updatedSubcategories) => {
    const subcategoryIds = updatedSubcategories.map(subcategory => subcategory._id);
    dispatch(reorderSubcategories(subcategoryIds));
  };

  // Move up handler
  const moveUp = (index) => {
    if (index === 0) return; // Don't allow move up for the first item
    const updatedSubcategories = [...filteredSubcategories];
    const temp = updatedSubcategories[index];
    updatedSubcategories[index] = updatedSubcategories[index - 1];
    updatedSubcategories[index - 1] = temp;
    handleReorder(updatedSubcategories);
  };

  // Move down handler
  const moveDown = (index) => {
    if (index === filteredSubcategories.length - 1) return; // Don't allow move down for the last item
    const updatedSubcategories = [...filteredSubcategories];
    const temp = updatedSubcategories[index];
    updatedSubcategories[index] = updatedSubcategories[index + 1];
    updatedSubcategories[index + 1] = temp;
    handleReorder(updatedSubcategories);
  };

  return (
    <div className='p-6 bg-gray-900 min-h-screen'>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4 text-white py-3">Manage Subcategories</h1>
        {/* Filter and Add Subcategory Section */}
        <div className="flex justify-between mb-4">
          {/* Filter by Category */}
          <div className="w-1/4">
            <label htmlFor="categoryFilter" className="block text-white font-semibold mb-2">
              Filter by Category
            </label>
            <select
              id="categoryFilter"
              className="w-full p-2 bg-gray-800 text-white rounded-md"
              value={selectedCategory}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {[...new Map(subcategories
                .filter((subcategory) => subcategory.categoryId)
                .map((subcategory) => [
                  subcategory.categoryId._id || subcategory.categoryId,
                  {
                    id: subcategory.categoryId._id || subcategory.categoryId,
                    name: subcategory.categoryId?.categoryName || 'Unknown Category',
                  },
                ]))
                .values()].map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Add Subcategory Button */}
          <div className='flex'>
            <div className='pe-3'>
              <Link to={'/superadmin/categories/add'} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md flex items-center no-underline">
                <FaPlus className="mr-2" /> Add Category
              </Link>
            </div>
            <div>
              <Link to="/superadmin/subcategories/add" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md flex items-center no-underline">
                <FaPlus className="mr-2" />
                Add Subcategory
              </Link>
            </div>
          </div>
        </div>

        {/* Subcategories Table */}
        <div className="overflow-x-auto custom-scrollbar-h bg-gray-800 p-2 rounded-lg shadow-md">
          <table className="min-w-full table-auto text-white">
            <thead className='bg-gray-700 text-gray-300'>
              <tr>
                <th className="px-4 py-2 text-center">Image</th>
                <th className="px-4 py-2 text-center">SubcategoryID</th>
                <th className="px-4 py-2 text-center">Subcategory Name</th>
                <th className="px-4 py-2 text-center">Category Name/Id</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubcategories.length > 0 ? (
                filteredSubcategories.map((subcategory, index) => (
                  <tr key={subcategory._id} className="hover:bg-gray-700 items-center">
                    <td className="text-center px-4 py-2">
                      <img
                        src={subcategory.image}
                        alt={subcategory.subcategoryName}
                        className="w-14 h-14 object-contain rounded-md"
                      />
                    </td>
                    <td className="text-center px-4 py-2">{subcategory._id}</td>
                    <td className="text-center px-4 py-2">{subcategory.subcategoryName}</td>
                    <td className="text-center px-4 py-2">
                      {subcategory.categoryId?.categoryName || 'Unknown'} /{' '}
                      {subcategory.categoryId?._id || 'N/A'}
                    </td>
                    <td className="px-2 flex justify-center  space-x-4 mt-2">
                      <Link
                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-md text-lg"
                        to={`/superadmin/subcategories/edit/${subcategory._id}`}
                      >
                        <FaEdit className="inline" />
                      </Link>
                      <button
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-lg rounded-md"
                        onClick={() => handleDelete(subcategory._id)}
                      >
                        <FaTrashAlt className="inline" />
                      </button>

                      {/* Move Up and Move Down Buttons */}
                      <button
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        className={`px-4 py-2 bg-gray-600 hover:bg-gray-500 text-lg text-white rounded-md ${index === 0 ? 'cursor-not-allowed bg-gray-500' : ''
                          }`}
                      >
                        <FaArrowUp />
                      </button>
                      <button
                        onClick={() => moveDown(index)}
                        disabled={index === filteredSubcategories.length - 1}
                        className={`px-4 py-2 bg-gray-600 hover:bg-gray-500 text-lg text-white rounded-md ${index === subcategories.length - 1 ? 'cursor-not-allowed bg-gray-500' : ''
                          }`}
                      >
                        <FaArrowDown />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center px-4 py-2">
                    No subcategories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubcategoriesPage;
