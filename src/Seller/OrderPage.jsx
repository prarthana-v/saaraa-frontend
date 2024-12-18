import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, Modal, Typography, TableCell, TableContainer, TablePagination, TableHead, TableRow, Grid, MenuItem, Paper, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../State/OrderSlice';
const apiurl = import.meta.env.VITE_API_URL


const OrderPage = () => {
  const [order, setOrders] = useState([])
  const [updating, setUpdating] = useState(null);
  const [filterStatus, setFilterStatus] = useState("Pending");

  const dispatch = useDispatch()

  const { orders, loading, error, page, rowsPerPage, totalPages } = useSelector((state) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);



  useEffect(() => {
    dispatch(fetchOrders({ page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    dispatch(fetchOrders({ page: newPage + 1, limit: rowsPerPage })); // Page is 1-based in API
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(fetchOrders({ page: 1, limit: parseInt(event.target.value, 10) })); // Reset to page 1
  };


  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const validStatuses = ["Pending", "Accepted", "Cancelled", "Received Back"];
  const filteredOrders = orders.filter((order) => order.status === filterStatus);

  const updateOrderStatusLocally = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleStatusChange = async (orderId, newStatus) => {
    // setUpdating(orderId);
    console.log(newStatus)
    try {
      const response = await axios.put(`${apiurl}/orders/${orderId}/status`, { status: newStatus }, {
        withCredentials: true,
      });
      if (response.data.success === true) {
        updateOrderStatusLocally(orderId, newStatus);
        toast.success(`Order status updated successfully to ${newStatus}`);
        dispatch(fetchOrders());
      }
    } catch (error) {
      console.log("errorr in status change", error)
      toast.error('Failed to update status');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <>
      <div className="">
        <Box sx={{ padding: '20px' }}>
          {/* Horizontal Filter Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
            <Button
              variant={filterStatus === 'Pending' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setFilterStatus('Pending')}
              sx={{ marginRight: 2 }}
            >
              Pending
            </Button>
            <Button
              variant={filterStatus === 'Accepted' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setFilterStatus('Accepted')}
              sx={{ marginRight: 2 }}
            >
              Accepted
            </Button>
            <Button
              variant={filterStatus === 'Received Back' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setFilterStatus('Received Back')}
              sx={{ marginRight: 2 }}
            >
              Received Back
            </Button>
            <Button
              variant={filterStatus === 'Cancelled' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setFilterStatus('Cancelled')}
            >
              Cancelled
            </Button>
          </Box>

          {/* Order Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Image</TableCell>
                  <TableCell>Product Details</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order) => (
                  <React.Fragment key={order._id}>
                    {/* Order Row */}
                    <TableRow style={{ backgroundColor: '#f7f7f7' }}>
                      <TableCell colSpan={5}>
                        <Typography variant="h6" fontWeight="bold">
                          Order ID: {order._id} (Status: {order.status})
                        </Typography>
                      </TableCell>
                    </TableRow>

                    {/* Product Rows */}
                    {order.Items.map((product, index) => (
                      <TableRow key={`${order._id}-${product._id}-${index}`} style={{ borderBottom: 'none' }}>
                        {/* Product Image */}
                        <TableCell>
                          <img
                            src={product.productId.images[0]}
                            alt="Product"
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                        </TableCell>

                        {/* Product Details */}
                        <TableCell>
                          <Box>
                            <p>{product.productId.productName}</p>
                            <p className="text-sm opacity-60">
                              <span>Order ID: </span>{order._id}
                            </p>
                          </Box>
                        </TableCell>

                        {/* Quantity */}
                        <TableCell>{product.quantity}</TableCell>

                        {/* Action */}
                        <TableCell>
                          {order.status === "Pending" && (
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleStatusChange(order._id, "Accepted")}
                                sx={{ marginRight: 1 }}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleStatusChange(order._id, "Cancelled")}
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          {order.status === "Accepted" && (
                            <>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleStatusChange(order._id, "Received Back")}
                                sx={{ marginRight: 1 }}
                              >
                                Received Back
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleStatusChange(order._id, "Cancelled")}
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          {/* Other status checks go here */}
                        </TableCell>

                        {/* View */}
                        <TableCell>
                          <Button variant="contained" color="secondary" onClick={() => handleViewDetails(order)}>
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>


          {/* Pagination Control */}
          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={totalPages * rowsPerPage}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}

          {/* Modal for Order Details */}
          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: '80%',
                height: '90%',
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                overflowY: 'auto'
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: '500' }} className='opacity-60'>
                Order Details
              </Typography>
              {selectedOrder && (
                <>
                  {/* Order Information */}
                  <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item xs={6} sm={6}>
                      <Typography>
                        <strong>Order ID:</strong> {selectedOrder._id}
                      </Typography>
                      <Typography>
                        <strong>Status:</strong> {selectedOrder.status}
                      </Typography>
                      <Typography>
                        <strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}
                      </Typography>
                      <Typography>
                        <strong>Purchase Date:</strong> {new Date(selectedOrder.purchaseDate).toLocaleString()}
                      </Typography>
                    </Grid>

                    {/* User Details */}
                    <Grid xs={6} x={6} sx={{ marginTop: 3, marginBottom: 3 }}>
                      <Typography variant="h6" sx={{ marginBottom: 1 }}>
                        User Details
                      </Typography>
                      <Typography>
                        <strong>Username:</strong> {selectedOrder.user?.username || "N/A"}
                      </Typography>
                      <Typography>
                        <strong>Email:</strong> {selectedOrder.user?.email || "N/A"}
                      </Typography>
                      <Typography>
                        <strong>Phone:</strong> {selectedOrder.user?.phone || "N/A"}
                      </Typography>
                      {selectedOrder.user?.address?.length > 0 && (
                        <Typography>
                          <strong>Address:</strong> {selectedOrder.user.address.join(", ")}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>

                  {/* Products Table */}
                  <Typography variant="h6" color="initial">Product Details</Typography>
                  <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product Image</TableCell>
                          <TableCell>Product Name</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedOrder.Items.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell>
                              <img
                                src={item.productId.images[0]}
                                alt={item.productId.productName}
                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                              />
                            </TableCell>
                            <TableCell>{item.productId.productName}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>₹{item.price}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Close Button */}
                  <Box sx={{ marginTop: 2, textAlign: "right" }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleCloseModal}
                    >
                      Close
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Modal>


          {/* Toast Container to display notifications */}
          <ToastContainer />
        </Box>

      </div >
    </>
  );
};

export default OrderPage;
