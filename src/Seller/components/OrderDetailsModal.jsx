import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const OrderDetailsModal = ({ order }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* <Button variant="contained" color="secondary" onClick={handleOpen}>
        View Details
      </Button> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="order-modal-title"
        aria-describedby="order-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Typography
            id="order-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Order Details
          </Typography>

          {/* User Details */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              User Information:
            </Typography>
            <Typography>Email: {order.user.email}</Typography>
            <Typography>Phone: {order.user.phone}</Typography>
            <Typography>Username: {order.user.username}</Typography>
          </Box>

          {/* Order Metadata */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Order Information:
            </Typography>
            <Typography>Order ID: {order._id}</Typography>
            <Typography>Status: {order.status}</Typography>
            <Typography>
              Purchase Date: {new Date(order.purchaseDate).toLocaleString()}
            </Typography>
            <Typography>Total Amount: ₹{order.totalAmount}</Typography>
          </Box>

          {/* Product Details */}
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {order.Items.map((item, index) => (
                  <TableRow key={index}>
                    {/* Product Name */}
                    <TableCell>
                      <Typography>{item.productId.productName}</Typography>
                    </TableCell>

                    {/* Quantity */}
                    <TableCell>
                      <Typography>Quantity: {item.quantity}</Typography>
                    </TableCell>

                    {/* Price */}
                    <TableCell>
                      <Typography>Price: ₹{item.price}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Close Button */}
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default OrderDetailsModal;
