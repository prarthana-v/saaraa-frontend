import React from 'react'
import './productCard.css'
import { useNavigate } from 'react-router-dom'

const Productcard = ({ product }) => {
  const navigate = useNavigate('')
  return (

    <div onClick={() => navigate(`/product/${5}`)} className="productCard max-w-[15rem] m-3 transition-all cursor-pointer">
      <div className="h-[20rem]">
        <img src={product.image} className='w-full h-full object-cover object-left-top' alt="" />
      </div>
      <div className="textPart bg-white p-3">
        <div className="">
          <p className='mb-0'>{product.name}</p>
          <p className='font-bold opacity-60 '>{product.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className='font-semibold '>{product.price}</p>
          <p className='line-through opacity-50'>{product.discount}</p>
          <p className='text-green-600 '>{product.off} Off</p>
        </div>
      </div>
    </div>

  )
}

export default Productcard
