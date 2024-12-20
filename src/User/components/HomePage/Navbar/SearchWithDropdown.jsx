const apiurl = import.meta.env.VITE_API_URL;
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { debounce } from "lodash";

const SearchWithDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); // Define dropdownRef

  // Debounced function for fetching categories
  const fetchCategories = debounce(async (searchQuery) => {
    try {
      if (!searchQuery.trim()) return; // Avoid fetching for empty input
      const response = await axios.get(`${apiurl}/product/search?query=${searchQuery}`);
      console.log(response.data);
      setCategories(response.data.categories || []);
      setSubcategories(response.data.subcategories || []);
      setProducts(response.data.products || []);
      setDropdownVisible(true); // Show dropdown after fetching
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  }, 500);

  // Handle input change and debounce API call
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) {
      fetchCategories(value);
    } else {
      setCategories([]);
      setSubcategories([]);
      setProducts([]);
      setDropdownVisible(false);
    }
  };

  // Handle item click (category, subcategory, or product)
  const handleItemClick = (itemName) => {
    setQuery(itemName); // Update search bar with selected item name
    setDropdownVisible(false); // Hide dropdown
    console.log("Selected:", itemName);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for Products, Categories, Subcategories, Keywords ..."
        className="pl-10 pr-4 py-2 text-base placeholder:text-sm placeholder:text-gray-400 border w-full rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-pprimary"

      />
      <FaSearch className="absolute top-3 left-4 text-gray-500" />
      {dropdownVisible && (
        <div className="absolute z-10 w-full mt-2 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto">
          {categories.length > 0 && (
            <div>
              <div className="font-semibold text-sm text-gray-700 px-4 py-2">Categories</div>
              {categories.map((category) => (
                <div
                  key={category._id}
                  onClick={() => handleItemClick(category.categoryName)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {category.categoryName}
                </div>
              ))}
            </div>
          )}
          {subcategories.length > 0 && (
            <div>
              <div className="font-semibold text-sm text-gray-700 px-4 py-2">Subcategories</div>
              {subcategories.map((subcategory) => (
                <div
                  key={subcategory._id}
                  onClick={() => handleItemClick(subcategory.subcategoryName)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {subcategory.subcategoryName}
                </div>
              ))}
            </div>
          )}
          {products.length > 0 && (
            <div>
              <div className="font-semibold text-sm text-gray-700 px-4 py-2">Products</div>
              {products.slice(0, 5).map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleItemClick(product.productName)}
                  className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.productName}
                    className="w-10 h-10 mr-2 object-cover rounded-full"
                  />
                  {product.productName}
                </div>
              ))}
            </div>
          )}
          {categories.length === 0 && subcategories.length === 0 && products.length === 0 && (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchWithDropdown;
