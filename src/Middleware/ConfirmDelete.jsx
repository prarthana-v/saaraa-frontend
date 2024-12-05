import React from 'react'
import { toast } from 'react-toastify';

const ConfirmDelete = (id) => {
  return new Promise((resolve, reject) => {
    toast(
      ({ closeToast }) => (
        <div className="text-center">
          <p className="font-medium text-md">Are you sure you want to delete this banner?</p>
          <div className="flex justify-center gap-4 mt-2">
            <button
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
              onClick={() => {
                closeToast();
                resolve(true);
              }}
            >
              Yes
            </button>
            <button
              className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500"
              onClick={() => {
                closeToast();
                resolve(false);
              }}
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false }
    );
  });
}

export default ConfirmDelete;
