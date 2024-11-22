import React from 'react'
import AddressCard from '../AddressCard/AddressCard'
import { Button } from '@mui/material'
import CartItem from '../Cart/CartItem'
import { Link } from 'react-router-dom'


const OrderSummary = () => {
  return (
    <div className='mx-5'>
      <div className="p-5 shadow-lg rounded-s-md border">
        <AddressCard />

      </div>

      <div>
        <div className="grid lg:grid-cols-3 relative lg:px-0">
          <div className="col-span-2">
            {
              [1, 1, 1, 1].map((item) => <CartItem />)
            }
          </div>
          <div className="col-12 px-4 sticky top-0 h-[100vh] mt-4 lg:mt-0">
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
              <Link to={'/checkout'}>
                <button className='btn btn-dark rounded-0 mt-4 '>
                  <span className='font-meduim poppins tracking-wide'>Checkout</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
