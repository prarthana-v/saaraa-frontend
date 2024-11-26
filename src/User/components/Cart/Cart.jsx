import React from 'react'
import CartItem from './CartItem'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const navigate = useNavigate()
  const handleCheckOut = () => {
    navigate(`/checkout?step=2`)
  }
  return (
    <div className='mt-40'>
      <div className="grid lg:grid-cols-3 relative lg:px-16">
        <div className="col-span-2">
          {
            [1, 1, 1, 1].map((item) => <CartItem />)
          }
        </div>
        <div className="px-4 sticky top-0 h-[100vh] mt-4 lg:mt-0">
          <div className="border p-3  bg-white shadow-lg rounded-lg">
            <p className="uppercase font-bold text-md opacity-60">Price details</p>
            <hr />
            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 m-0">
                <span>Price</span>
                <span className='text-green-600'>$200</span>
              </div>
              <div className="flex justify-between pt-3 m-0">
                <span>Disount</span>
                <span className='text-green-600'>$200</span>
              </div>
              <div className="flex justify-between pt-3 m-0">
                <span>Delivery Charge</span>
                <span className='text-green-600'>$200</span>
              </div>
              <hr className='my-4' />
              <div className="flex justify-between font-bold text-black m-0">
                <span>Total Amount</span>
                <span>$200</span>
              </div>
            </div>

            <button onClick={handleCheckOut} className='btn btn-dark w-full rounded-0 mt-4 '>
              <span className='font-meduim poppins tracking-wide'>Place Order</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
