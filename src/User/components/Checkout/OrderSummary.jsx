import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const OrderSummary = () => {
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);

  return (
    <div className="container mx-auto my-40">
      <div className="grid grid-cols-12 gap-6">
        {/* Products Section - 8/12 */}
        <div className="col-span-8 bg-white shadow-md rounded-md p-6 overflow-y-auto h-[630px]">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-6">
            {items.map((item, index) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b pb-4 mb-4"
              >
                {/* Product Image */}
                <div className="flex items-center space-x-4">
                  <img
                    src={item.productId.images[0]}
                    alt={item.productName}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <div>
                    <h3 className="text-lg font-medium">{item.productName}</h3>
                    <p className="text-sm text-gray-500 mb-1">
                      Quantity: <span className="font-semibold">{item.quantity}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Price: ₹{parseFloat(item.price).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
                {/* Product Total */}
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    ₹{parseFloat(item.totalPrice).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Details Section - 4/12 */}
        <div className="col-span-4 bg-gray-50 shadow-md rounded-md p-6">
          <h2 className="text-xl font-semibold mb-4">Pricing Details</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Total Quantity</span>
              <span>{totalQuantity}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{parseFloat(totalAmount).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>₹{items.reduce((acc, item) => acc + item.discount, 0)}</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total Amount</span>
              <span>
                ₹
                {parseFloat(
                  totalAmount - items.reduce((acc, item) => acc + item.discount, 0)
                ).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
          <Link to={'/checkout/payment'}>
            <button className="w-full mt-5 py-2 bg-pprimary font-medium tracking-wide roboto text-white rounded-md hover:bg-gray-500">
              Proceed to Payment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
