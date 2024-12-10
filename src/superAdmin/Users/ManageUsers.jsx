import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../State/SuperAdminSlice';
import '../SuperStyles/Sidebar.css'

const ManageUsers = () => {
  const dispatch = useDispatch();
  useSelector((state) => console.log(state.superadmin))
  const [expandedRow, setExpandedRow] = useState(null); // To track which row is expanded
  const { users, total, page, totalPages } = useSelector((state) => state?.superadmin?.users);
  const isLoading = useSelector((state) => state.superadmin.isLoading);
  console.log(users)
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10; // Number of users per page

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, limit }));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const handleDetailsToggle = (userId) => {
    setExpandedRow((prev) => (prev === userId ? null : userId));
  };


  return (
    <div className="p-4 bg-gray-900 h-full text-white ">
      <h2 className="text-lg font-bold mb-4">Manage Users</h2>
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
            {users?.map((user, index) => (
              <React.Fragment key={user._id}>
                <tr className="border-b border-gray-700 bg-gray-800">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.username}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.phone}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDetailsToggle(user._id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                    >
                      Details
                    </button>
                  </td>
                </tr>
                {/* Conditionally render extra details */}
                {expandedRow === user._id && (
                  <tr>
                    <td colSpan={5} className="bg-gray-700 text-white">
                      <div className="p-4">
                        <h4 className="text-lg font-semibold mb-2">User Details</h4>
                        <p>
                          <strong>Address:</strong> {user.address.length > 0 ? user.address.join(', ') : 'N/A'}
                        </p>
                        <p>
                          <strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}
                        </p>
                        <p>
                          <strong>Payment Info:</strong> {user.paymentInformation.length > 0 ? JSON.stringify(user.paymentInformation) : 'N/A'}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
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

export default ManageUsers;
