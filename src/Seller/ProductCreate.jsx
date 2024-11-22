import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Box, TextField, Button, Typography, Grid, MenuItem, FormControlLabel, Checkbox, IconButton, Tooltip,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import ClearIcon from '@mui/icons-material/Clear';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import dropdownData from "../Data/productAddData";
import { InputAdornment } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { createProduct } from "../State/ProductSlice";
import ImageUploadSection from "./components/ImageUploadSection";

const AddProductPage = () => {
  const location = useLocation();

  const [category, setCategory] = useState(location.state?._id || '');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: category ? category : "",
    color: "",
    sleeveLength: "",
    size: [],
    images: [],
    material: "",
    occasion: "",
    pattern: "",
    fit: "",
    price: "",
    stock: "",
    manufacturerDetails: "",
    packerDetails: "",
  });
  const [images, setImages] = useState([]);
  const dispatch = useDispatch()


  useEffect(() => {
    if (location.state?.category) {
      setCategory(location.state.category);
    }
  }, [location.state]);


  const handleSizeChange = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size) // Remove size if already selected
        : [...prev, size] // Add size if not selected
    );
  };

  const handleDone = () => {
    console.log("Selected Sizes:", selectedSizes);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert("You can upload up to 5 images only.");
      return;
    }
    setImages([...images, ...files].slice(0, 5));
  };

  const handleImageRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        // Skip images here, handle below
        return;
      }
      if (Array.isArray(formData[key])) {
        formData[key].forEach((value) => {
          formDataToSend.append(key, value);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    images.forEach((file) => {
      formDataToSend.append("images", file);
    });

    console.log("FormData to send:", formDataToSend);

    dispatch(createProduct(formDataToSend));
    setFormData({
      productName: "",
      description: "",
      category: "",
      color: "",
      sleeveLength: "",
      size: [],
      images: [],
      material: "",
      occasion: "",
      pattern: "",
      fit: "",
      price: "",
      stock: "",
      manufacturerDetails: "",
      packerDetails: "",
    })
    navigate('/seller/products')
    toast.success("Product added successfully!");

  };

  return (
    <>
      <div className="bg-light">
        <div className="container">
          <div className="row">
            <Box sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Add Product Deatils
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={10}>
                  {/* Input Fields */}
                  <Grid item xs={12} md={8}>
                    <Box display="flex" flexDirection="column" gap={2}>
                      <Grid container spacing={2}>
                        {/* Product Name */}
                        <Grid item xs={12} sm={6}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                              label="Product Name"
                              name="productName"
                              value={formData.productName}
                              onChange={handleInputChange}
                              variant="outlined"
                              fullWidth

                            />
                            <Tooltip title="Enter the name of your product as it will appear on your listing.">
                              <IconButton aria-label="info">
                                <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </Grid>

                        {/* SKU ID */}
                        <Grid item xs={12} sm={6}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                              label="ProductId/SKUid"
                              name="skuid"
                              value={formData.skuid}
                              onChange={handleInputChange}
                              fullWidth

                            />
                            <Tooltip title="Unique ID to track this product in your inventory.">
                              <IconButton aria-label="info">
                                <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </Grid>

                        {/* Price */}
                        <Grid item xs={12} sm={6}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                              label="Price"
                              name="price"
                              value={formData.price}
                              onChange={handleInputChange}
                              type="number"
                              fullWidth

                            />
                            <Tooltip title="Set the selling price for your product.">
                              <IconButton aria-label="info">
                                <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </Grid>

                        {/* Stock */}
                        <Grid item xs={12} sm={6}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                              label="Stock Quantity"
                              name="stock"
                              value={formData.stock}
                              onChange={handleInputChange}
                              type="number"
                              min='2'
                              fullWidth

                            />
                            <Tooltip title="Enter the total quantity of stock available for this product.">
                              <IconButton aria-label="info">
                                <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </Grid>

                        {/* product details heading  */}
                        <Grid item xs={12}>
                          <p className="fs-18 mb-0 opacity-70 border-bottom mt-3 pb-3 fw-500">
                            Product Deatils
                          </p>
                        </Grid>

                        {/* sizes */}
                        <Grid item xs={12} sm={6}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <TextField select fullWidth name="select size" label='Select Sizes'>
                              {dropdownData.sizes.map((size) => (
                                <FormControlLabel
                                  style={{ margin: 5, }}
                                  key={size}
                                  control={
                                    <Checkbox
                                      checked={selectedSizes.includes(size)}
                                      onChange={() => handleSizeChange(size)}
                                    />
                                  }
                                  label={size}
                                />
                              ))}
                              <Button variant="contained" color="primary" onClick={handleDone} sx={{ marginInline: 2 }}>
                                Done
                              </Button>
                            </TextField>
                            <Tooltip title="Select the sleeve length of the product. This attribute helps customers filter clothing by sleeve type.">
                              <IconButton aria-label="info">
                                <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </Grid>


                        {/* Pattern */}
                        <Grid item xs={12} sm={6}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                              select
                              label="Pattern"
                              name="pattern"
                              value={formData.pattern}
                              onChange={handleInputChange}
                              fullWidth

                            >
                              {dropdownData.patterns.map((pattern) => (
                                <MenuItem key={pattern} value={pattern}>
                                  {pattern}
                                </MenuItem>
                              ))}
                            </TextField>
                            <Tooltip title="Indicate the pattern type for this product (e.g., Striped, Plain).">
                              <IconButton aria-label="info">
                                <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </Grid>

                        {/* color */}
                        <Grid item xs={12} sm={6}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                              select
                              label="Color"
                              name="color"
                              value={formData.color}
                              onChange={handleInputChange}
                              fullWidth

                            >
                              {dropdownData.colors.map((color) => (
                                <MenuItem key={color} value={color}>
                                  {color}
                                </MenuItem>
                              ))}
                            </TextField>
                            <Tooltip title="Select the primary color of your product. This helps customers filter and identify products based on their color preferences.">
                              <IconButton aria-label="info">
                                <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </Grid>

                        {/* sleeve lenght */}
                        <Grid item xs={12} sm={6}>
                          <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                            <TextField
                              select
                              label="Sleeve Length"
                              name="sleeveLength"
                              value={formData.sleeveLength || ""}
                              onChange={handleInputChange}
                              fullWidth

                            >
                              {dropdownData.sleeveLengths.map((length) => (
                                <MenuItem key={length} value={length}>
                                  {length}
                                </MenuItem>
                              ))}
                            </TextField>
                            <Tooltip title="Select the sleeve length of the product. This attribute helps customers filter clothing by sleeve type.">
                              <IconButton aria-label="info">
                                <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </Grid>


                        {/* Occasion */}
                        <Grid item xs={12} sm={6}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                              select
                              label="Occasion"
                              name="occasion"
                              value={formData.occasion}
                              onChange={handleInputChange}
                              fullWidth

                            >
                              {dropdownData.occasions.map((occasion) => (
                                <MenuItem key={occasion} value={occasion}>
                                  {occasion}
                                </MenuItem>
                              ))}
                            </TextField>
                            <Tooltip title="Select the suitable occasion for this product.">
                              <IconButton aria-label="info">
                                <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </Grid>

                        {/* Material */}
                        <Grid item xs={12} sm={6}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                              select
                              label="Material"
                              name="material"
                              value={formData.material}
                              onChange={handleInputChange}
                              fullWidth

                            >
                              {dropdownData.materials.map((material) => (
                                <MenuItem key={material} value={material}>
                                  {material}
                                </MenuItem>
                              ))}
                            </TextField>
                            <Tooltip title="Specify the material of the product (e.g., Cotton, Polyester).">
                              <IconButton aria-label="info">
                                <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </Grid>

                        {/* Manufacturer Details */}
                        <Grid item xs={12} md={6}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                              label="Manufacturer Details"
                              name="manufacturerDetails"
                              variant="outlined"
                              fullWidth
                            />
                            <Tooltip title="Provide the manufacturer's full address, including contact details.">
                              <IconButton aria-label="info">
                                <InfoOutlinedIcon style={{ fontSize: '16px' }} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </Grid>

                        {/* Packer Details */}
                        <Grid item xs={12} md={6}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                              label="Packer Details"
                              name="packerDetails"
                              variant="outlined"
                              fullWidth
                            />
                            <Tooltip title="Provide the packer's full address, including contact details.">
                              <IconButton aria-label="info">
                                <InfoOutlinedIcon style={{ fontSize: '16px' }} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </Grid>

                        {/* Description */}
                        <Grid item xs={12}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                              label="Description"
                              name="description"
                              value={formData.description}
                              onChange={(e) => {
                                // Check if the length is under the limit before updating the state
                                if (e.target.value.length <= 3000) {
                                  handleInputChange(e); // Call your handler to update state
                                }
                              }}
                              fullWidth
                              multiline
                              rows={3}

                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end" sx={{
                                    alignItems: "flex-start", position: "absolute", bottom: 8, right: 15,
                                  }}>
                                    {`${formData.description.length}/3000C`}
                                  </InputAdornment>
                                ),
                              }}
                            />
                            <Tooltip title="Provide a detailed description of the product (maximum 3000 characters).">
                              <IconButton aria-label="info">
                                <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </Grid>

                      </Grid>
                    </Box>
                  </Grid>


                  {/* Image Upload */}
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Upload Product Images (Max 5)
                    </Typography>
                    <Box className=''>
                      <ImageUploadSection />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        border: "1px dashed gray",
                        mt: 3,
                        p: 2,
                      }}
                    >
                      {/* Instructions */}
                      {images.length === 0 && (
                        <Typography sx={{ color: "gray", textAlign: "center" }}>
                          Add product images. Ensure high quality and proper resolution.
                        </Typography>
                      )}

                      {/* Images Section */}
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 2,
                          justifyContent: "center",
                        }}
                      >
                        {/* Render Uploaded Images */}
                        {images.map((image, index) => (
                          <Box
                            key={index}
                            sx={{
                              position: "relative",
                              width: '80px',
                              height: '80px',
                              border: "1px solid gray",
                              borderRadius: 2,
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`product-${index}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                            <IconButton

                              sx={{ position: "absolute", top: 5, right: 5, background: '#00000069', width: '10px', height: '10px', p: 1.4 }}
                              onClick={() => handleImageRemove(index)}
                            >
                              <ClearIcon className="text-white" size='small' />
                            </IconButton>
                          </Box>
                        ))}

                        {/* Add Image Button */}
                        {
                          images.length < 5 && (
                            <Box
                              sx={{
                                width: '80px',
                                height: '80px',
                                border: "1px dashed gray",
                                borderRadius: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                              }}
                              component="label"
                            >
                              <input
                                type="file"
                                hidden
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                              />
                              <Add fontSize="large" sx={{ color: "gray" }} />
                            </Box>
                          )
                        }
                      </Box>
                    </Box>

                    <Typography variant="body2" className="opacity-50" sx={{ mb: 2 }}>
                      <strong>Guidelines:</strong> Ensure the product images are
                      clear, the product details are accurate, and no prohibited
                      items are listed.
                    </Typography>
                  </Grid>
                </Grid>

                {/* Submit */}
                <Box sx={{ mt: 4 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Add Product
                  </Button>
                </Box>
              </form>
            </Box>
          </div>
        </div >
      </div >
    </>
  );
};

export default AddProductPage;
