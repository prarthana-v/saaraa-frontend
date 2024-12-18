import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartItems } from '../../../State/CartSlice'
import { ShoppingCart } from '@mui/icons-material';

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state?.cart)
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart)
  const cart = cartItems?.data?.cart
  console.log(cart);


  useEffect(() => {
    dispatch(fetchCartItems())
  }, [dispatch])

  return (
    <div className="mt-16 lg:mt-40">
      <div className="grid lg:grid-cols-3 gap-8 px-4 lg:px-16">
        {/* Left side (Cart Items) */}
        <div className="col-span-2 border bg-white rounded-lg pt-0 p-6 h-[600px] overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col mt-10 items-center justify-center text-center ">
              <ShoppingCart className="mx-auto text-gray-500" style={{ fontSize: '5rem' }} />
              <p className="text-2xl font-semibold mt-6 poppins">Your Cart is Empty</p>
              <p className="text-md text-gray-600 mt-2 poppins">
                Looks like you haven't added anything to your cart yet.
              </p>
              <div className="mt-8">
                <Link
                  to="/"
                  className="bg-gray-900 text-white px-4 py-3 rounded-sm no-underline tracking-wide montserrat-a  "
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div>
              {items.map((item, i) => (
                <CartItem key={i} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Right side (Price Details) */}
        <div className=" p-6 bg-white rounded-lg  sticky top-0 h-[fit-content]">
          <p className="uppercase font-semibold text-sm text-gray-600">Price Details</p>
          <hr className="my-4" />
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total Price</span>
              <span className="text-lg font-semibold text-green-600">{totalAmount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total Discount</span>
              <span className="text-lg font-semibold text-green-600">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total Cart Items</span>
              <span className="text-lg font-semibold text-green-600">{totalQuantity}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center font-bold text-lg text-black">
              <span>Total Amount</span>
              <span className="text-lg">{totalAmount}</span>
            </div>
          </div>

          <div className="mt-3 flex ">
            <Link to={'/checkout'} className="w-full text-center no-underline py-3 px-4 rounded-sm montserrat-a tracking-wide text-white bg-gray-900">
              Proceed to Rent
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Cart
