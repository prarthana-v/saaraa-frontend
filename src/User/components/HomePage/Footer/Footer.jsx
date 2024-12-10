import React from "react";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="bg-utility text-sec pt-14">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-1 montserrat-a ">
          {/* About Us Section */}
          <div>
            <h3 className="montserrat-a text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-600 fs-14">
              Saaraa Trends brings the latest in fashion, from casual wear to formal outfits, with a focus on high-quality, stylish clothing.
              Discover our amazing collections today!
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="montserrat-a text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="text-gray-600 fs-15">
              <li><a href="#" className="block mb-2 hover:text-primary transition-colors no-underline">Home</a></li>
              <li><a href="#" className="block mb-2 hover:text-primary transition-colors no-underline">Categories</a></li>
              <li><a href="#" className="block mb-2 hover:text-primary transition-colors no-underline">Privacy Policy</a></li>
              <li><a href="#" className="block mb-2 hover:text-primary transition-colors no-underline">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="montserrat-a text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-600 fs-15">Email: support@saaratrends.com</p>
            <p className="text-gray-600 fs-15">Phone: +91 123 456 7890</p>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="montserrat-a text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-2">
              <a href="#" className="text-gray-600 opacity-80 hover:text-blue-500 transition-colors ">
                <Facebook fontSize="large" />
              </a>
              <a href="#" className="text-gray-600 opacity-80 hover:text-pink-500 transition-colors ps-2">
                <Instagram fontSize="large" />
              </a>
              <a href="#" className="text-gray-600 opacity-80 hover:text-blue-400 transition-colors ps-2">
                <Twitter fontSize="large" />
              </a>
              <a href="#" className="text-gray-600 opacity-80 hover:text-blue-700 transition-colors ps-2">
                <LinkedIn fontSize="large" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="text-center mt-12 border-t border-gray-700 pt-6 text-gray-400">
          <p>&copy; {new Date().getFullYear()} Saaraa Trends. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
