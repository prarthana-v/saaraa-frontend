import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, IconButton, TableRow, Paper, Button, Modal, Box, Typography } from "@mui/material";

const apiurl = import.meta.env.VITE_API_URL;

const ProductList = ({ filteredProducts, filterCategory }) => {
  console.log(filteredProducts, filterCategory)
  const [selectedProduct, setSelectedProduct] = useState(null); // For modal
  const [openModal, setOpenModal] = useState(false);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const truncateDescription = (desc) =>
    desc?.length > 50 ? `${desc.slice(0, 50)}...` : desc;

  return (
    <div className="product-list p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell className="font-semibold text-center">Image</TableCell>
              <TableCell className="font-semibold text-center">Category</TableCell>
              <TableCell className="font-semibold text-center">Name</TableCell>
              <TableCell className="font-semibold text-center">Status</TableCell>
              <TableCell className="font-semibold text-center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(Array.isArray(filteredProducts) && filteredProducts.length > 0
              ? filteredProducts
              : products.filter((product) => {
                if (!filterCategory) return true;
                return (
                  product.categoryName === filterCategory
                )
              })
            ).map((product) => (
              <TableRow key={product._id}>
                <TableCell className="text-center">
                  {product.images && product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.productName || "Product"}
                      className="h-12 w-12 object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-gray-500">No image</span>
                  )}
                </TableCell>
                <TableCell className="text-center">{product.subcategoryName || "No category"}</TableCell>
                <TableCell className="text-center">
                  <Typography variant="subtitle1" className="font-medium">
                    {product.productName || "No name"}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    {truncateDescription(product.description)}
                  </Typography>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    // disabled
                    className="capitalize"
                  >
                    {product.status}
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleViewProduct(product)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      {/* Modal for Product Details */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          className="bg-white rounded-md p-6 shadow-lg custom-scrollbar-seller"
          sx={{
            width: "80%",
            maxHeight: "80vh",
            overflowY: "auto",
            mx: "auto",
            mt: 10,
          }}
        >

          {selectedProduct && (
            <>
              <div className="flex items-center justify-between">
                <h5 className="poppins opacity-60 text-gray-800 font-semibold">Product Details</h5>
                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="btn btn-dark rounded-0"
                >
                  X
                </button>
              </div>
              <Typography variant="h6" className="font-bold mb-4">
                {selectedProduct.productName}
              </Typography>
              <Typography variant="body1" className="mb-4">
                {selectedProduct.description}
              </Typography>
              <div className="flex gap-4">
                {/* Main Image */}
                <div className="flex flex-col items-center">
                  <img
                    src={selectedProduct.images[1]}
                    alt="Main"
                    className="h-[350px] w-[300px] object-contain mb-4"
                  />
                  <div className="flex gap-2">
                    {selectedProduct.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index}`}
                        className="h-12 w-12 object-cover cursor-pointer rounded-md"
                        onClick={() => {
                          const newImages = [...selectedProduct.images];
                          newImages.unshift(newImages.splice(index, 1)[0]);
                          setSelectedProduct({
                            ...selectedProduct,
                            images: newImages,
                          });
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div>
                  <Typography variant="body2" className="mb-2">
                    <strong>Category:</strong> {selectedProduct.categoryName}
                  </Typography>
                  <Typography variant="body2" className="mb-2">
                    <strong>Subcategory:</strong> {selectedProduct.subcategoryName}
                  </Typography>
                  <Typography variant="body2" className="mb-2">
                    <strong>SKUID:</strong> {selectedProduct.skuid}
                  </Typography>
                  <Typography variant="body2" className="mb-2">
                    <strong>Price:</strong> ₹{selectedProduct.price}
                  </Typography>
                  <Typography variant="body2" className="mb-2">
                    <strong>Stock:</strong> {selectedProduct.stock}
                  </Typography>

                  <Typography variant="body2" className="mb-2">
                    <strong>MRP:</strong> {selectedProduct.mrp}
                  </Typography>
                  {/* Add more fields as needed */}
                </div>

                <div>
                  <Typography variant="body2" className="mb-2">
                    <strong>Material:</strong> {selectedProduct.material}
                  </Typography>
                  <Typography variant="body2" className="mb-2">
                    <strong>Pattern:</strong> {selectedProduct.pattern}
                  </Typography>
                  <Typography variant="body2" className="mb-2">
                    <strong>Color:</strong> {selectedProduct.color}
                  </Typography>
                  <Typography variant="body2" className="mb-2">
                    <strong>Sizes:</strong> {selectedProduct.sizes?.join(", ")}
                  </Typography>
                  <Typography variant="body2" className="mb-2">
                    <strong>sleeveLength:</strong> {selectedProduct.sleeveLength}
                  </Typography>
                  <Typography variant="body2" className="mb-2">
                    <strong>manufacturerDetails:</strong> {selectedProduct.manufacturerDetails}
                  </Typography>
                  <Typography variant="body2" className="mb-2">
                    <strong>packerDetails:</strong> {selectedProduct.packerDetails}
                  </Typography>
                </div>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ProductList;
