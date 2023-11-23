import React, { useState, useEffect } from 'react';
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Payments() {


  const [ownerId, setOwnerId] = useState('');
  const [platformFees, setPlatformFees] = useState(200);

  useEffect(() => {
    // Fetch data from localStorage and URL parameters when the component mounts
    const storedOwnerId = localStorage.getItem('owner_id');
    setOwnerId(storedOwnerId);
  }, []);

  const handleSubmit = (e) => {
    toast.success("Payment Success");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-10">
      <div className="absolute top-0 left-0 p-4">
        <img className="h-10 w-auto" src={Logo} alt="Your Company" />
      </div>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="ownerId"
              className="block text-gray-700 font-medium mb-2"
            >
              Owner ID
            </label>
            <input
              type="text"
              id="ownerId"
              name="ownerId"
              value={ownerId}
              readOnly
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 bg-gray-200"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="platformFees"
              className="block text-gray-700 font-medium mb-2"
            >
              Platform Fees (200 INR)
            </label>
            <input
              type="text"
              id="platformFees"
              name="platformFees"
              value={platformFees + " INR"}
              readOnly
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 bg-gray-200"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-600"
          >
            Pay
          </button>
        </form>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
