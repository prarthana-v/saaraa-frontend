// // src/context/AuthContext.js
// import React, { createContext, useState, useEffect } from "react";
// import Cookies from "js-cookie";

// // Create the AuthContext
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check for the token in cookies on component mount
//     const token = Cookies.get("accessToken"); // Get token from cookie
//     console.log(token, "is there");

//     setIsLoggedIn(!!token);
//   }, []);

//   const login = (token) => {
//     Cookies.set("accessToken", token, { expires: 1 }); // Set token in cookie with 1-day expiry
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     Cookies.remove("accessToken"); // Remove token from cookies
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
