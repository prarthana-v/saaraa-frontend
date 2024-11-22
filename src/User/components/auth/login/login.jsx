import React, { useState } from "react";
import { TextField, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../../State/UserAuthSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      email,
      password,
    };

    try {
      const result = await dispatch(loginUser(obj));
      console.log(result);

      if (loginUser.fulfilled.match(result)) {
        toast.success('Login successful!');
        navigate('/');
      } else {
        // Show only one toast for errors
        const errorMessage = result.payload?.error || 'Login failed!';
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error('An unexpected error occurred.');
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
