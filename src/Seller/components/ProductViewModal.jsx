import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductViewModal = ({ product }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEdit = () => {
    navigate('/seller/inventory')
  }
  return (
    <div>
      {/* View Button */}
      <button
        onClick={handleOpen}
        className="bg-blue-500 text-white px-4 py-2 text-md rounded hover:bg-blue-600 transition"
      >
        View
      </button>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="product-details-title"
        aria-describedby="product-details-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          {/* Modal Content */}
          <Typography id="product-details-title" variant="h6" component="h2">
            {product.name}
          </Typography>
          <Typography id="product-details-description" sx={{ mt: 2 }}>
            <strong>Description:</strong> {product.description}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <strong>Price:</strong> {product.price}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <strong>Stock:</strong> {product.stock}
          </Typography>
          {/* Close Button */}
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClose}
            sx={{ mt: 3 }}
          >
            Close
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleEdit}
            sx={{ mt: 3, ml: 2 }}
          >
            Edit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductViewModal;
