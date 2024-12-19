import React, { useState } from "react";
import { TextField, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../../State/UserAuthSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
const apiurl = import.meta.env.VITE_API_URL
import axios from 'axios';

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      email,
      password,
    };

    try {
      const result = await dispatch(loginUser(obj));
      console.log(result, "result");

      if (loginUser.fulfilled.match(result)) {
        const token = result.payload.token;
        console.log("Token when handlesumbit:", token);

        // Check authentication status after login
        const checkAuth = async () => {
          try {
            const response = await axios.get(`${apiurl}/auth/check-auth`, {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`, // Include token
              },
            });

            console.log("check-auth response", response);

            if (response.data.success === true) {
              setIsAuthenticated(true); // User is logged in

              // Determine where to navigate after successful authentication
              const redirectUrl = localStorage.getItem("redirectAfterLogin");
              if (redirectUrl) {
                navigate(redirectUrl); // Redirect to the saved URL
                localStorage.removeItem("redirectAfterLogin"); // Clean up storage
              } else {
                navigate("/"); // Default to home or dashboard
              }
            } else {
              setIsAuthenticated(false); // Handle authentication failure
              toast.error("Authentication failed.");
            }
          } catch (error) {
            console.log("Error in check-auth:", error);
            setIsAuthenticated(false); // Handle auth error
            toast.error("An error occurred while verifying authentication.");
          }
        };

        // Call the authentication check
        await checkAuth();
      } else {
        // Handle login failure
        const errorMessage = result.payload || "Login failed!";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred.");
    }

  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-pink-50 via-blue-50 to-teal-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center items-center mb-3 rounded  px-4 py-2">

          <div className="col-3">
            <img src="logo/saraa-trends-bg.png" className="img-fluid" alt="" />
          </div>
          <div className="col-9 flex justify-center align-center">
            <p className=" text-center playfair text-3xl font-semibold text-black-500 ">
              Welcome Back !!
            </p>

          </div>
        </div>
        <div>
          <p className="text-xl poppins text-center ">Login</p>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
            required
          />

          {/* Password Input */}
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
            required
          />

          {/* Remember Me Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onChange={() => setRemember(!remember)}
                color="primary"
              />
            }
            label="Remember me"
          />

          {/* Forgot Password Link */}
          <div className="flex justify-between items-center mb-6">
            <Link href="#" className="text-teal-500 text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="mb-4"
            size="large"
          >
            Login
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to={'/register'} className="cursor-pointer text-lg underline text-teal-500">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
