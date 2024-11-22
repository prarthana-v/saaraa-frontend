// import React, { useState } from "react";
// import { Dialog } from "@headlessui/react";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// const CartItem = ({ image, title, price, sizes = [] }) => {
//  const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);


//   return (
//     <div className="max-w-xs mx-auto bg-white overflow-hidden group transform transition duration-300 hover:scale-105">
//       {/* Image Section */}
//       <div className="relative">
//         <img
//           src={image}
//           alt={title}
//           className="w-full h-96 object-cover object-center transition-all duration-300 group-hover:opacity-80"
//         />
//         <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all">
//           {/* Hover actions */}
//           <button
//             className="bg-white p-2 rounded-full shadow-lg mr-2"
//             onClick={handleOpen}
//             aria-label="Quick View"
//           >
//             <VisibilityIcon color="black" className="text-black" fontSize="large" />
//           </button>
//           <button
//             className="bg-white p-2 rounded-full shadow-lg"
//             aria-label="Add to Wishlist"
//           >
//             <FavoriteBorderIcon className="text-black" fontSize="large" />
//           </button>
//         </div>
//       </div>

//       {/* Card Details Section */}
//       <div className="p-2">
//         <h3 className="text-lg mb-0 font-semibold text-gray-800 truncate">{title}</h3>

//         <p className="text-md text-gray-500 mb-0">₹{price}</p>
//         <p className="text-md text-gray-600 mb-0">
//           Sizes: {sizes.length > 0 ? sizes.join(", ") : "Not Available"}
//         </p>

//       </div>

//       {/* <div className="px-1 flex justify-between items-center">
//         <button className="bg-black text-white px-4 py-2 shadow-md hover:bg-green-700 transition-all duration-200">
//           Add to Cart
//         </button>
//         <button className="text-green-600 text-sm">Wishlist</button>
//       </div> */}

//       {/* Modal for Product Details */}
//       <Dialog open={open} onClose={handleClose}>
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
//           <Dialog.Panel className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
//             <img
//               src={image}
//               alt={title}
//               className="w-full h-64 object-cover object-center rounded-md mb-4"
//             />
//             <p className="text-lg text-gray-700 mb-4">Price: ₹{price}</p>
//             <p className="text-sm text-gray-600">
//               Sizes: {sizes.length > 0 ? sizes.join(", ") : "Not Available"}
//             </p>
//             <div className="mt-6 flex justify-end">
//               <button
//                 className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
//                 onClick={handleClose}
//               >
//                 Close
//               </button>
//             </div>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default CartItem;
import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./CardItem.css";

const CardItem = ({ image, title, price, sizes = [] }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="card-container px-2">
      {/* Image Section */}
      <div className="image-wrapper">
        <img src={image} alt={title} className="card-image" />
        {/* Hover Actions */}
        <div className="hover-overlay">
          <button className="hover-btn" onClick={handleOpen}>
            <VisibilityIcon className="icon" />
          </button>
          <button className="hover-btn">
            <FavoriteBorderIcon className="icon" />
          </button>
        </div>
      </div>

      {/* Minimal Details */}
      <div className="p-2">
        <h3 className="text-lg mb-0 font-semibold text-gray-800 truncate">{title}</h3>

        <p className="text-md text-gray-500 mb-0">₹{price}</p>
        <p className="text-md text-gray-600 mb-0">
          Sizes: {sizes.length > 0 ? sizes.join(", ") : "Not Available"}
        </p>

      </div>

      {/* Modal for Details */}
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box">
          <h2 className="modal-title">{title}</h2>
          <img src={image} alt={title} className="modal-image" />
          <p className="modal-price">Price: ₹{price}</p>
          <p className="modal-sizes">
            Sizes: {sizes.length > 0 ? sizes.join(", ") : "Not available"}
          </p>
          <button className="modal-close-btn" onClick={handleClose}>
            Close
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default CardItem;
