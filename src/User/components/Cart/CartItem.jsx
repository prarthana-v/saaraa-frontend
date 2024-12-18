import React, { useState } from 'react';
import { IconButton, Button } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { removeCartItem } from '../../../State/CartSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
const apiurl = import.meta.env.VITE_API_URL

const CartItem = ({ item }) => {
  console.log(item)

  const dispatch = useDispatch()
  const [count, setCount] = useState(1);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleUpdateQuantity = async (newQuantity) => {
    if (newQuantity < 1) {
      toast.error('Invalid Quantity !')
    }; // Prevent setting quantity to 0 or less

    try {
      const response = await axios.put(`${apiurl}/cart/update-item`, {
        productId: item.productId._id,
        quantity: newQuantity,
      }, {
        withCredentials: true,
      });
      console.log(response)
      if (response.data.success === true) {
        setQuantity(newQuantity); // Update UI state
        toast.success('quantity updated successfully')
      } else {
        toast.error("Failed to update quantity:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (id) => {
    console.log(id, 'removed')
    try {
      let result = await dispatch(removeCartItem(id));
      console.log(result)

    } catch (error) {
      console.log('Error removing item:', error);
    }
  }

  return (
    <div>
      <div className="p-4 my-4  border rounded-lg">
        <div className="flex items-center">
          <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[10rem] rounded-md overflow-hidden">
            <img
              src={item.productId.images[1]}
              className='w-full h-full object-cover object-center'
              alt="Product"
            />
          </div>
          <div className="ml-9 space-y-1">
            <p className='font-semibold mb-1'>{item.productName}</p>
            <p className='opacity-70'>Size: {item.productId.sizes.join(",")}</p>
            <p className='opacity-70 mt-2'>Seller: Abc Fashion</p>
            <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
              <p className="font-semibold text-gray-900 text-sm montserrat">Price : {item.price}</p>
            </div>
            <div className="flex items-center lg:space-x-10 ">
              <div className="grid-cols-1 flex items-center space-x-2">
                <span>
                  <IconButton onClick={() => handleUpdateQuantity(quantity - 1)}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </span>
                <span className='py-1 px-4 border rounded-sm'>
                  {quantity}
                </span>
                <span>
                  <IconButton onClick={() => handleUpdateQuantity(quantity + 1)}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </span>
              </div>
              <div className="grid-cols-11 justify-start ms-3">
                <button className='montserrat-a text-sm tracking-wide font-semibold' onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartItem;
