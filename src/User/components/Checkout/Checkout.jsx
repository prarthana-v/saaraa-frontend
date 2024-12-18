import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, getAddressByUser, updateAddress } from '../../../State/addressSlice';
import { fetchCartItems } from '../../../State/CartSlice';
import { toast } from 'react-toastify'
import { placeOrder } from '../../../State/OrderSlice';
import { useNavigate } from 'react-router-dom'

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addresses } = useSelector((state) => state.addresses);
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // For modal visibility
  const [editAddress, setEditAddress] = useState(null); // For editing address
  const [newAddress, setNewAddress] = useState({
    addressline1: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    mobile: '',
  });

  useEffect(() => {
    dispatch(getAddressByUser());
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleAddressSelect = (index) => {
    setSelectedAddressIndex(index);
  };

  const handlePaymentSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePaymentMethodSubmit = () => {
    setCurrentStep(3);
  };

  const handlePlaceOrder = async () => {
    console.log('Order placed with:', {
      shippingAddress: addresses?.addresses[selectedAddressIndex]._id,
      paymentMethod: selectedPaymentMethod,
      items: items,
    });
    const orderData = {
      shippingAddress: addresses?.addresses[selectedAddressIndex]._id,
      paymentMethod: selectedPaymentMethod,
      items: items,
    }

    const result = await dispatch(placeOrder(orderData))
    console.log(result)
    if (result?.payload?.success === true) {
      toast.success('Order Placed SuccesFully');
      navigate('/order-confirmation');
    } else {
      toast.error(result?.payload?.message);
      toast.error('Order Failed')
    }
  };

  // Handle opening modal for editing address
  const handleOpenModal = (isEdit, address = null) => {
    setEditAddress(isEdit ? address : null);
    setNewAddress(isEdit ? address : {
      addressline1: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      mobile: '',
    });
    setModalVisible(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setModalVisible(false);
    setEditAddress(null);
  };

  const handleAddressSubmit = async () => {
    try {
      if (editAddress) {
        // Update the address
        console.log(editAddress)
        let result = await dispatch(updateAddress({ id: editAddress._id, updatedAddress: newAddress })).unwrap();
        if (result?.success === true) {
          dispatch(getAddressByUser());
          console.log('Address updated successfully');
          toast.success('Address updated successfully')
        }
        else {
          console.log(result);
          toast.error('Failed to edit address')
        }
      } else {
        // Add the new address
        const result = await dispatch(addAddress(newAddress));
        console.log('New address added successfully:', result);
        if (result?.payload?.success === true) {
          dispatch(getAddressByUser());
          toast.success('New address added successfully')
        }
        else {
          console.log(result.payload);

          toast.error('Failed to add new address')
        }
      }
    } catch (error) {
      console.error('Error submitting address:', error);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <div className="container mx-auto mt-40 space-y-10">
      {/* Step 1: Delivery Address */}
      <div className={`p-6 bg-white shadow-md rounded-md ${currentStep >= 1 ? 'block' : 'hidden'}`}>
        <div className="mb-4 flex justify-between">
          <h2 className="text-xl font-semibold">Select Delivery Address</h2>
          <button
            onClick={() => handleOpenModal(false)}
            className="bg-pprimary text-white text-md py-1 px-3 rounded-md"
          >
            Add new Address
          </button>
        </div>
        <div className="space-y-4">
          {addresses?.addresses?.map((address, index) => (
            <div
              key={index}
              onClick={() => handleAddressSelect(index)}
              className={`px-3 border py-2 rounded-md cursor-pointer flex justify-between ${selectedAddressIndex === index ? 'border-pprimary bg-gray-100' : 'border-gray-300'}`}
            >
              <div>
                <p className="font-medium mb-0">{address.addressline1}, {address.city} {address.state}, {address.country}, {address.zipCode}</p>
                <p className="text-sm mb-0 text-gray-500">Phone: {address.mobile}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handleOpenModal(true, address); }}
                className="bg-pprimary text-white text-md px-3 rounded-md"
              >
                Edit
              </button>
            </div>
          ))}
          <button
            onClick={() => setCurrentStep(2)}
            disabled={selectedAddressIndex === null}
            className={`mt-4 py-2 px-6 rounded-md ${selectedAddressIndex !== null ? 'bg-pprimary text-white' : 'bg-gray-400 text-white cursor-not-allowed'} hover:bg-pprimary`}
          >
            Deliver Here
          </button>
        </div>
      </div>

      {/* Step 2: Payment Details */}
      <div className="bg-white p-6 shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-3">Select Payment Method</h2>
        <div className={`${currentStep >= 2 ? 'block' : 'hidden'}`}>
          <div className="space-y-4">
            {['Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Cash on Delivery'].map((method, index) => (
              <div
                key={index}
                className={`p-4 border rounded-md cursor-pointer ${selectedPaymentMethod === method ? 'border-pprimary bg-gray-100' : 'border-gray-300'}`}
                onClick={() => handlePaymentSelect(method)}
              >
                {method}
              </div>
            ))}
          </div>
          <button
            onClick={handlePaymentMethodSubmit}
            disabled={!selectedPaymentMethod}
            className={`mt-4 py-2 px-6 rounded-md ${selectedPaymentMethod ? 'bg-pprimary text-white' : 'bg-gray-400 text-white cursor-not-allowed'} hover:bg-pprimary`}
          >
            Review Order Summary
          </button>
        </div>
      </div>

      {/* Step 3: Order Summary */}
      <div className="p-6 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
        <div className={`${currentStep === 3 ? 'block' : 'hidden'}`}>
          <div className="space-y-6">
            {items.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4 mb-4 bg-white">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.productId.images[0]}
                    alt={item.productName}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <div>
                    <h3 className="text-lg font-medium">{item.productName}</h3>
                    <p className="text-sm text-gray-500 mb-1">Quantity: {item.quantity}</p>
                    <p className="text-sm text-gray-500">Price: ₹{parseFloat(item.price).toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <p className="text-lg font-semibold">₹{parseFloat(item.totalPrice).toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <p className="font-semibold">Total Quantity: {totalQuantity}</p>
            <p className="font-semibold">Total Amount: ₹{parseFloat(totalAmount).toLocaleString('en-IN')}</p>
            <button
              onClick={handlePlaceOrder}
              className="mt-4 py-2 px-6 bg-pprimary font-medium tracking-wide text-white rounded-md hover:bg-pprimary"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit Address */}
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-semibold mb-4">{editAddress ? 'Edit Address' : 'Add New Address'}</h2>
            <form>
              <input
                type="text"
                placeholder="Address Line 1"
                className="w-full mb-4 p-2 border rounded-md"
                value={newAddress.addressline1}
                onChange={(e) => setNewAddress({ ...newAddress, addressline1: e.target.value })}
              />
              <input
                type="text"
                placeholder="City"
                className="w-full mb-4 p-2 border rounded-md"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
              />
              <input
                type="text"
                placeholder="State"
                className="w-full mb-4 p-2 border rounded-md"
                value={newAddress.state}
                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
              />
              <input
                type="text"
                placeholder="Country"
                className="w-full mb-4 p-2 border rounded-md"
                value={newAddress.country}
                onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
              />
              <input
                type="text"
                placeholder="Zip Code"
                className="w-full mb-4 p-2 border rounded-md"
                value={newAddress.zipCode}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 6) {
                    setNewAddress({ ...newAddress, zipCode: value });
                  }
                }}
              />
              <input
                type="text"
                placeholder="Phone"
                className="w-full mb-4 p-2 border rounded-md"
                value={newAddress.mobile}
                onChange={(e) => {
                  const value = e.target.value;
                  // Only allow numbers (and prevent empty values)
                  if (/^\d*$/.test(value) && value.length <= 10) {
                    setNewAddress({ ...newAddress, mobile: value });
                  }
                }}
              />
              <div className="flex justify-between">
                <button type="button" onClick={handleCloseModal} className="bg-gray-500 text-white py-2 px-4 rounded-md">Cancel</button>
                <button type="button" onClick={handleAddressSubmit} className="bg-pprimary text-white py-2 px-4 rounded-md">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
