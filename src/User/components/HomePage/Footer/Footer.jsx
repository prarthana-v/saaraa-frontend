import React from "react";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="bg-gray-100 text-gray-800 py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About Us Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-600">
              Saaraa Trends brings the latest in fashion, from casual wear to formal outfits, with a focus on high-quality, stylish clothing.
              Discover our amazing collections today!
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="text-gray-600">
              <li><a href="#" className="block mb-2 hover:text-primary">Home</a></li>
              <li><a href="#" className="block mb-2 hover:text-primary">Categories</a></li>
              <li><a href="#" className="block mb-2 hover:text-primary">About Us</a></li>
              <li><a href="#" className="block mb-2 hover:text-primary">Contact</a></li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-600 mb-2">Email: support@saaratrends.com</p>
            <p className="text-gray-600">Phone: +91 123 456 7890</p>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary"><Facebook /></a>
              <a href="#" className="text-gray-600 hover:text-primary"><Instagram /></a>
              <a href="#" className="text-gray-600 hover:text-primary"><Twitter /></a>
              <a href="#" className="text-gray-600 hover:text-primary"><LinkedIn /></a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="text-center mt-10 border-t pt-6 text-gray-600">
          <p>&copy; {new Date().getFullYear()} Saaraa Trends. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
