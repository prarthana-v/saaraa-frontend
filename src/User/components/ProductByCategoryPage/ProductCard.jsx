import React from 'react'
import './productCard.css'
import { useNavigate } from 'react-router-dom'

const Productcard = ({ product }) => {
  console.log(product)
  const navigate = useNavigate('')
  return (
    <a href={`/product/${product._id}`} target='_blank' className='no-underline'>
      <div className="productCard max-w-[15rem] m-3 transition-all cursor-pointer">
        <div className="h-[20rem]">
          <img src={product.images[0]} className='w-full h-full object-cover object-left-top' alt="" />
        </div>
        <div className="textPart bg-white p-3">
          <div className="">
            <p className='mb-0'>{product.productName}</p>
          </div>
          <div className="flex items-center space-x-2">
            <p className='font-semibold '>{product.price}</p>
          </div>
        </div>
      </div>
    </a>
  )
}

export default Productcard
