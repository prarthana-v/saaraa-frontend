import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, fetchCartItems } from '../../../State/CartSlice' // Adjust the import path
import { toast } from 'react-toastify';
import { Stepper, Step, StepLabel, StepContent } from '@mui/material';
import { getUserRecord } from '../../../State/UserAuthSlice';

const steps = ['Ordered', 'OnRent', 'Returned'];

const OrderConfirmationPage = () => {
  const [currentStep, setCurrentstep] = useState(0)
  const activeStep = parseInt(currentStep, 10) || 0;

  console.log("Active Step:", activeStep);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);
  useSelector((state) => console.log(state.userauth?.user?.user));

  useEffect(() => {
    dispatch(fetchCartItems());
    dispatch(getUserRecord());
  }, [dispatch])

  const { addresses } = useSelector((state) => state.addresses); // Address data
  // const { selectedAddressIndex, selectedPaymentMethod } = useSelector((state) => state.checkout); // Assumed values for the selected address and payment method

  const handleGoHome = () => {
    dispatch(clearCart());
    navigate('/');
    toast.success('Order confirmed! Your cart is now empty.');
  };

  return (
    <div className="container mx-auto mt-40 space-y-10">
      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Order Confirmation</h2>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Order Summary */}
        <div className="mb-6 mt-5">
          <h3 className="text-xl font-medium mb-2">Order Summary</h3>
          <div className="space-y-4">
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
        </div>

        {/* Shipping Information */}
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">Shipping Information</h3>
          {/* <p>{addresses?.addresses[selectedAddressIndex]?.addressline1}, {addresses?.addresses[selectedAddressIndex]?.city}, {addresses?.addresses[selectedAddressIndex]?.state}, {addresses?.addresses[selectedAddressIndex]?.country} - {addresses?.addresses[selectedAddressIndex]?.zipCode}</p>
          <p>Phone: {addresses?.addresses[selectedAddressIndex]?.mobile}</p> */}
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">Payment Method</h3>
        </div>

        {/* Total */}
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">Total Amount</h3>
          <p className="text-lg font-semibold">₹{parseFloat(totalAmount).toLocaleString('en-IN')}</p>
        </div>

        {/* Confirm Button */}
        <div className="flex justify-end">
          <button
            onClick={handleGoHome}
            className="px-6 py-2 bg-pprimary text-white rounded-md font-medium"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
