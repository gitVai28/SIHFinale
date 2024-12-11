import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState(); 
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic her
    if (password === 'chavan123' && email === "chavan123@gmail.com"){
      setIsAuthenticated(true);
      navigate("/admin/alerts");
    }
    
    
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Admin Login</h1>
          <p className="text-gray-500">Please log in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500"
              placeholder="Enter your email"
              
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500"
              placeholder="Enter your password"
              
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Log In
          </button>
          <div className="text-center">
            <a
              href="#"
              className="text-gray-700 hover:text-gray-800 font-medium"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
