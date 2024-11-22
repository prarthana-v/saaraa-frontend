import React, { useState } from "react";
import { TextField, Button, } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../../State/UserAuthSlice";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useSelector((state) => console.log(state.userauth));
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    // Validate password match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Registration Data:", formData);
    try {
      const result = await dispatch(registerUser(formData))
      console.log(result);
      if (registerUser.fulfilled.match(result)) {
        toast.success('Registration successful!');
        navigate('/login');
        // Optionally, redirect the user or reset the form
      } else {
        toast.error(result.payload?.error || 'Registration failed!');
      }

    } catch (error) {
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-pink-50 via-blue-50 to-teal-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-center items-center mb-3 rounded  px-4 py-2">

          <div className="col-3">
            <img src="logo/saraa-trends-bg.png" className="img-fluid" alt="" />
          </div>
          <div className="col-9 flex justify-center align-center">
            <p className=" text-center playfair text-3xl font-semibold text-black-500 ">
              Create an Account
            </p>

          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <TextField
            label="Username"
            name="username"
            type="text"
            fullWidth
            variant="outlined"
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            required
          />

          {/* Email Field */}
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Phone Field (Optional) */}
          <TextField
            label="Phone (Optional)"
            name="phone"
            type="tel"
            fullWidth
            variant="outlined"
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Confirm Password Field */}
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="mt-4"
            size="large"
          >
            Register
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="#" className="text-teal-500 ">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
