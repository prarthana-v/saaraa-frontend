import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddressByUser } from '../../../State/addressSlice';
import { Link } from 'react-router-dom'

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.addresses);
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phoneNumber: '',
  });
  const [isRadioSelected, setIsRadioSelected] = useState(false);

  useEffect(() => {
    dispatch(getAddressByUser());
  }, [dispatch]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Address: ', formData);
    handleCloseModal(); // Close modal after submit
  };

  const handleOpenModal = (isEditMode, address = null, index = null) => {
    setIsEdit(isEditMode);
    setSelectedAddress(address);
    setSelectedAddressIndex(index);
    setFormData(address || {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phoneNumber: '',
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleRadioChange = (index) => {
    setSelectedAddressIndex(index);
    setIsRadioSelected(true);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold opacity-70">Select Delivery Address</h2>
        <button
          className="bg-pprimary font-medium text-white py-2 px-4 rounded-md hover:bg-gray-500"
          onClick={() => handleOpenModal(false)}
        >
          Add New Address
        </button>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto">
        <table className="min-w-full  table-auto border-collapse">
          <thead className="bg-pprimary">
            <tr>
              <th className="px-4 py-2 text-center text-sm font-medium text-white tracking-wide">#</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white tracking-wide">Select</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white tracking-wide">UserName</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white tracking-wide">Address</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white tracking-wide">PhoneNumber</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-white tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody>
            {addresses?.addresses?.map((address, index) => (
              <tr key={index} className="border-b">
                <td className='px-4 py-2 text-sm text-center'>{++index}.</td>
                <td className="px-4 py-2 text-sm text-center">
                  <input
                    type="radio"
                    checked={selectedAddressIndex === index}
                    onChange={() => handleRadioChange(index)}
                  />
                </td>
                <td className='px-4 py-2 text-sm text-center'>
                  {addresses.username}
                </td>
                <td className="px-4 py-2 text-sm text-center">
                  <div className="space-y-3">
                    <p className='mb-1'>{address.addressline1} , {address.city}</p>
                    <p className='mt-0 text-uppercase'>{address.state}, {address.country}, {address.zipCode}</p>
                  </div>
                </td>
                <td className='px-4 py-2 text-sm text-center'>
                  {address.mobile}
                </td>
                <td className="px-4 py-2 text-sm text-center">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleOpenModal(true, address, index)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Address Modal */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-md w-96 shadow-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">
                {isEdit ? 'Edit Address' : 'Add New Address'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <div className="w-full">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleAddressChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleAddressChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleAddressChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    rows="4"
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <div className="w-full">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleAddressChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State/Province</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleAddressChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="w-full">
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip/Postal Code</label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleAddressChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleAddressChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryAddressForm;
