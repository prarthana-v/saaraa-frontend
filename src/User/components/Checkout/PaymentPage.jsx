import React, { useState } from "react";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePaymentSubmit = () => {
    // Logic for payment processing or redirection
    console.log(`Selected Payment Method: ${paymentMethod}`);
  };

  return (
    <div className="min-h-screen bg-white text-white flex flex-col items-center py-10">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6 text-rose-500">Payment Details</h1>

      {/* Payment Methods */}
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-rose-400">Choose Payment Method</h2>

        <div className="space-y-4">
          {/* Payment Options */}
          <div className="flex items-center">
            <input
              type="radio"
              id="card"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => handlePaymentChange("card")}
              className="text-rose-500 focus:ring-rose-400 focus:ring-offset-gray-900"
            />
            <label htmlFor="card" className="ml-3 text-sm text-rose-300">Credit/Debit Card</label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="upi"
              name="payment"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={() => handlePaymentChange("upi")}
              className="text-rose-500 focus:ring-rose-400 focus:ring-offset-gray-900"
            />
            <label htmlFor="upi" className="ml-3 text-sm text-rose-300">UPI</label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="cod"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => handlePaymentChange("cod")}
              className="text-rose-500 focus:ring-rose-400 focus:ring-offset-gray-900"
            />
            <label htmlFor="cod" className="ml-3 text-sm text-rose-300">Cash on Delivery</label>
          </div>
        </div>

        {/* Input Fields (Conditionally Rendered) */}
        {paymentMethod === "card" && (
          <div className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Cardholder's Name"
              className="w-full bg-gray-700 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <input
              type="text"
              placeholder="Card Number"
              className="w-full bg-gray-700 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-1/2 bg-gray-700 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-1/2 bg-gray-700 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter UPI ID"
              className="w-full bg-gray-700 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handlePaymentSubmit}
          className="mt-6 w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded font-semibold transition-all">
          Proceed to Pay
        </button>
      </div>

      {/* Security Assurance */}
      <p className="mt-6 text-sm text-gray-400">
        <i className="fas fa-lock text-rose-500"></i> Your payment is secure
      </p>
    </div>
  );
};

export default PaymentPage;
