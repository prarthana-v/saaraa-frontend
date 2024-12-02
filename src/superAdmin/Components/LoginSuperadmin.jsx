import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate for redirection
const apiurl = import.meta.env.VITE_API_URL
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"; // Import toast
import { loginSuperAdmin } from "../../State/SuperAdminSlice";

const SecretKeyModal = ({ onBack, onKeyVerified }) => {
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");

  const handleVerifyKey = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${apiurl}/superadmin/verify-secret-key`,
        { secretKey }, // Send the entered secret key
        { withCredentials: true } // Ensure cookies are sent
      );

      console.log(response)
      if (response.data.success === true) {
        toast.success("Secret key verified successfully!");
        onKeyVerified(); // Trigger the dashboard redirection
      } else {
        setError("Invalid secret key. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying secret key:", error);
      setError("An error occurred while verifying the secret key.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-md w-96 text-white">
        <h2 className="text-xl mb-4">Enter Secret Key</h2>
        <input
          type="password"
          placeholder="Enter Secret Key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md"
          >
            Back
          </button>
          <button
            onClick={handleVerifyKey}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

const LoginSuperadmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [LoginSuccess, setLoginSuccess] = useState(false)
  const [IsAuthenticated, setIsAuthenticated] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let obj = {
        email: email,
        password: password,
      };

      // Verify superadmin authentication
      const authResponse = await axios.get(
        `${apiurl}/superadmin/check-superadmin`,
        { withCredentials: true }
      );
      // console.log(authResponse)
      if (authResponse.data.success) {
        console.log("User is superadmin");
        setIsAuthenticated(true);
        setIsModalOpen(true); // Show modal for secret key
      } else {
        console.log("Not a superadmin");
        setIsAuthenticated(false);
      }

      // Attempt login
      const response = await dispatch(loginSuperAdmin(obj));
      console.log(response)
      let superloggedtoken = response?.payload?.superloggedtoken;

      if (!superloggedtoken) {
        console.log("Login failed");
        setLoginSuccess(false);
        return;
      }
      // Display success toast notification
      toast.success("Login successful! Please enter the secret key.");
      console.log("Login successful");
      setLoginSuccess(true);


    } catch (error) {
      console.log("An error occurred during login.", error);
      if (error?.response?.data) {
        setError(error.response.data.message);
      }
    }
  };


  const handleKeyVerified = () => {
    // Redirect to the dashboard after successful secret key verification
    navigate("/superadmin"); // Redirect to Dashboard page
    console.log('on dashboard');
  };

  return (
    <>
      {!isModalOpen ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
          <div className="bg-gray-800 p-8 rounded-lg w-96">
            <h1 className="text-2xl mb-4">Super Admin Login</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded-md bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 rounded-md bg-gray-700 text-white"
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-md"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        <SecretKeyModal
          onBack={() => setIsModalOpen(false)} // Go back to login box
          onKeyVerified={handleKeyVerified} // Handle successful key verification
        />
      )}
    </>
  );
};

export default LoginSuperadmin;
