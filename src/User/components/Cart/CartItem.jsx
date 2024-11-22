import React, { useState } from 'react';
import { IconButton, Button } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CartItem = () => {
  const [count, setCount] = useState(1);

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <div className="p-4 my-4 shadow-lg border rounded-lg">
        <div className="flex items-center">
          <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] rounded-md overflow-hidden">
            <img
              src="https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/29988485/2024/6/18/a0bcf2d5-b563-4f9a-add4-06075f0929e81718707632307SangriaGirlsPrintedCottonA-LineDress1.jpg"
              className='w-full h-full object-cover object-top'
              alt="Product"
            />
          </div>
          <div className="ml-9 space-y-1">
            <p className='font-semibold mb-1'>Small Girls Pink and White Frock</p>
            <p className='opacity-70'>Size: L, White</p>
            <p className='opacity-70 mt-2'>Seller: Abc Fashion</p>
            <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
              <p className="font-semibold text-gray-900 text-sm montserrat">$50</p>
              <p className='opacity-50 line-through poppins text-sm'>$40</p>
              <p className='text-green-600 font-semibold poppins text-sm'>10% off</p>
            </div>
          </div>
        </div>
        <div className="flex items-center lg:space-x-10 pt-4">
          <div className="grid-cols-1 flex items-center space-x-2">
            <span>
              <IconButton onClick={handleDecrease}>
                <RemoveCircleOutlineIcon />
              </IconButton>
            </span>
            <span className='py-1 px-4 border rounded-sm'>
              {count}
            </span>
            <span>
              <IconButton onClick={handleIncrease}>
                <AddCircleOutlineIcon />
              </IconButton>
            </span>
          </div>
          <div className="grid-cols-11 justify-start ms-3">
            <Button>Remove</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
