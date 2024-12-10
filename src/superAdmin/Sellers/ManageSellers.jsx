import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellers } from '../../State/SuperAdminSlice';
import '../SuperStyles/Sidebar.css';

const ManageSellers = () => {
  const dispatch = useDispatch();
  const [expandedRow, setExpandedRow] = useState(null); // To track which row is expanded
  const { sellers, total, page, totalPages } = useSelector((state) => state?.superadmin?.sellers);
  const isLoading = useSelector((state) => state.superadmin.isLoading);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10; // Number of sellers per page

  // Fetch sellers when the component loads or the page changes
  useEffect(() => {
    dispatch(fetchSellers({ page: currentPage, limit }));
  }, [dispatch, currentPage]);

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Toggle the extra details for a specific row
  const handleDetailsToggle = (sellerId) => {
    setExpandedRow((prev) => (prev === sellerId ? null : sellerId));
  };

  return (
    <div className="p-4 bg-gray-900 h-full text-white">
      <h2 className="text-lg font-bold mb-4">Manage Sellers</h2>
      <div className="overflow-x-auto bg-gray-800 p-2 rounded-lg custom-scrollbar">
        <table className="min-w-full text-md">
          <thead>
            <tr className="border-b border-gray-700 bg-gray-700">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Username</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : sellers?.length > 0 ? (
              sellers.map((seller, index) => (
                <React.Fragment key={seller._id}>
                  <tr className="border-b border-gray-700 bg-gray-800">
                    <td className="py-3 px-4">{(page - 1) * limit + index + 1}</td>
                    <td className="py-3 px-4">{seller.username}</td>
                    <td className="py-3 px-4">{seller.email}</td>
                    <td className="py-3 px-4">{seller.phone}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDetailsToggle(seller._id)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                  {/* Conditionally render extra details */}
                  {expandedRow === seller._id && (
                    <tr>
                      <td colSpan={5} className="bg-gray-700 text-white">
                        <div className="p-4">
                          <h4 className="text-lg font-semibold mb-2">Seller Details</h4>
                          <p>
                            <strong>Email:</strong> {seller.email}
                          </p>
                          <p>
                            <strong>Phone:</strong> {seller.phone}
                          </p>
                          <p>
                            <strong>Created At:</strong> {new Date(seller.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No sellers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center items-center gap-2">
        <button
          className="px-4 py-1 bg-gray-700 text-white rounded"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Back
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-1 bg-gray-700 text-white rounded"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageSellers;
