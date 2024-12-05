import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createProduct } from "../State/ProductSlice";


const AddProductPage = () => {
  const location = useLocation();
  console.log(location)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [category, setCategory] = useState(location.state?.category?._id || "");
  const [subcategory, setSubcategory] = useState(location.state?.subcategory?._id || "")
  useEffect(() => {
    if (location.state?.category) {
      setCategory(location.state.category);
    }
  }, [location.state]);

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: category || "",
    subcategory: subcategory || "",
    color: "",
    sleeveLength: "",
    sizes: [],
    images: [],
    material: "",
    occasion: "",
    pattern: "",
    price: "",
    stock: "",
    skuid: "",
    mrp: "",
    manufacturerDetails: "",
    packerDetails: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      toast.error("You can upload up to 5 images only.");
      return;
    }
    setImages([...images, ...files].slice(0, 5));
  };

  const handleImageRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };


  const handleToggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (size) => {
    setSelectedSizes(prevSizes =>
      prevSizes.includes(size)
        ? prevSizes.filter(item => item !== size)
        : [...prevSizes, size]
    );
  };

  const sizeOptions = ["S", "M", "L", "XL"];

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, 'price')
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMrpChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, 'mrp')
    if (value < formData.price) {
      setError('MRP cannot be less than Price');
    } else {
      setError('');
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for MRP vs Price validation
    if (error) {
      toast.error("MRP cannot be less than Price");
      return;
    }

    // Create FormData to send to the backend
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        // Skip images for now; handle separately below
        return;
      }

      if (Array.isArray(formData[key])) {
        // Append array fields (e.g., sizes)
        formData[key].forEach((value) => {
          formDataToSend.append(key, value);
        });
      } else {
        // Append other fields
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append images
    images.forEach((file) => {
      formDataToSend.append("images", file);
    });

    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }
    console.log([...formDataToSend.entries()]); // Debugging FormData entries

    try {
      // Dispatch the Redux action to create the product
      const response = await dispatch(createProduct(formDataToSend)).unwrap();

      console.log("Product created successfully:", response);

      // Reset form state after success
      setFormData({
        productName: "",
        description: "",
        category: "",
        color: "",
        sleeveLength: "",
        sizes: [],
        images: [],
        material: "",
        occasion: "",
        pattern: "",
        price: "",
        mrp: "",
        stock: "",
        skuid: "",
        manufacturerDetails: "",
        packerDetails: "",
      });

      setSelectedSizes([]); // Reset selected sizes
      setImages([]); // Reset images
      toast.success("Product added successfully!");
      navigate('/seller/products')
    } catch (err) {
      console.error("Error creating product:", err);

      // Show appropriate error message
      const errorMessage =
        err?.message || err?.payload || "Failed to create product. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="">
        <div className="min-h-screen bg-gray-100 p-6">
          <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">Add Product Details</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    required
                    value={formData.productName || ""}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">SKU ID</label>
                  <input
                    type="text"
                    name="skuid"
                    required
                    value={formData.skuid}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Price and Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Price</label>
                  <input
                    type="number"
                    name="price"
                    required
                    value={formData.price || ""}
                    onChange={handlePriceChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    required
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                {/* MRP  */}
                <div className="mb-6">
                  <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
                    MRP price
                  </label>
                  <input
                    type="number"
                    id="mrp"
                    name="mrp"
                    onChange={handleMrpChange}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter MRP price"
                  />
                </div>
              </div>


              {/* Product Description */}
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter product description"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sizes</label>
                  <div className="relative">
                    <button
                      onClick={handleToggleDropdown}
                      className="w-full border border-gray-300 rounded-md p-2 text-left"
                    >
                      {selectedSizes.length > 0 ? selectedSizes.join(", ") : "Select Sizes"}
                    </button>
                    {isOpen && (
                      <div className="absolute left-0 right-0 top-12 bg-white border border-gray-300 rounded-md shadow-md">
                        {sizeOptions?.map((size) => (
                          <div key={size} className="flex items-center p-2">
                            <input
                              type="checkbox"
                              id={size}
                              value={size}
                              required
                              checked={selectedSizes.includes(size)}
                              onChange={() => handleCheckboxChange(size)}
                              className="mr-2"
                            />
                            <label htmlFor={size}>{size}</label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-2">
                    Selected Sizes: {selectedSizes.join(", ")}
                  </div>
                </div>
                {/* Color */}
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <select
                    name="color"
                    value={formData.color || ""}
                    required
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    {["None", "Blue", "Red", "Green", "Black", "White"].map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sleeve Length */}
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sleeve Length</label>
                  <select
                    name="sleeveLength"
                    value={formData.sleeveLength || ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    {["None", "Sleeveless", "Short Sleeve", "Long Sleeve", "3/4 Sleeve"].map((sleeve) => (
                      <option key={sleeve} value={sleeve}>
                        {sleeve}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Material */}
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                  <select
                    name="material"
                    value={formData.material || ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    {["None", "Cotton", "Silk", "Polyester", "Wool"].map((material) => (
                      <option key={material} value={material}>
                        {material}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Occasion */}
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Occasion</label>
                  <select
                    name="occasion"
                    value={formData.occasion || ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    {["None", "Casual", "Formal", "Festive", "Party"].map((occasion) => (
                      <option key={occasion} value={occasion} >
                        {occasion}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pattern */}
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pattern</label>
                  <select
                    name="pattern"
                    value={formData.pattern || ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    {["Solid", "Striped", "Checked", "Printed"].map((pattern) => (
                      <option key={pattern} value={pattern}>
                        {pattern}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Manufacturer Details */}
                <div className="w-full px-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer Details</label>
                  <textarea
                    type="text"
                    name="manufacturerDetails"
                    rows="4"
                    required
                    value={formData.manufacturerDetails || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter Manufacturer's Details"
                  ></textarea>
                </div>

                {/* Packer Details */}
                <div className="w-full px-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Packer Details</label>
                  <textarea
                    type="text"
                    name="packerDetails"
                    rows="4"
                    required
                    value={formData.packerDetails || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter Packer's Details"
                  ></textarea>
                </div>
              </div>
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                Tags
                <div className="mb-6">
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="E.g., electronics, phone, mobile"
                  />
                </div>
              </div> */}
              {/* Image Upload Section */}
              <div className="w-full lg:w-1/3 mb-6">
                <h6 className="text-lg font-semibold mb-4">Upload Product Images (Max 5)</h6>
                <div>
                  {/* Image Upload Instructions */}
                  {images.length === 0 && (
                    <p className="text-gray-500 text-center mb-4">
                      Add product images. Ensure high quality and proper resolution.
                    </p>
                  )}

                  {/* Images Preview Section */}
                  <div className="flex flex-wrap gap-4 justify-center border border-gray-300 p-4 rounded-md">
                    {/* Render Uploaded Images */}
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="relative w-20 h-20 border border-gray-300 rounded-md overflow-hidden"
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`product-${index}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          className="absolute top-1 right-1 bg-gray-800 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          onClick={() => handleImageRemove(index)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    {/* Add New Image */}
                    {images.length < 5 && (
                      <label
                        className="w-20 h-20 border border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer"
                      >
                        <input
                          type="file"
                          hidden
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <span className="text-gray-400 text-lg">+</span>
                      </label>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Guidelines:</strong> Ensure the product images are clear, the product details are accurate, and no prohibited items are listed.
                </p>
              </div>


              {/* Submit Button */}
              <div className="w-full mt-6">
                <button
                  type="submit"

                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div >
      </div >
    </>
  );
};

export default AddProductPage;
