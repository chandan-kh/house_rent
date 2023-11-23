import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Logo from "../assets/logo.svg";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Payments() {

  const navigate = useNavigate();
  const { houseId: paramHouseId, ownerId: paramOwnerId, rentAmount: paramRent } = useParams();

  const [rentAmount, setRentAmount] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [houseId, setHouseId] = useState('');
  const [tenantId, setTenantId] = useState('');

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Fetch data from localStorage and URL parameters when the component mounts
    const storedTenantId = localStorage.getItem('tenant_id');
    setTenantId(storedTenantId);
    setHouseId(paramHouseId);
    setOwnerId(paramOwnerId);
    setRentAmount(paramRent);
  }, [paramHouseId, paramOwnerId, paramRent]);

   const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;

   const handleSubmit = (e) => {

    e.preventDefault();
    console.log(formattedDate);

    const paymentData = {
      rentAmount: rentAmount,
      date: formattedDate,
      tenant_id: tenantId,
      owner_id: ownerId,
      house_id: houseId
    };

    axios
    .post("http://localhost:4000/payments", paymentData)
    .then((response) => {
      console.log("Payment submitted successfully:", response.data);
      toast.success("Payment submitted successfully!");
  
      // Wait for 4 seconds before navigating
      setTimeout(() => {
        navigate("/tenantprofile");
      }, 4000);
    })
    .catch((error) => {
      console.error("Error submitting payment:", error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "The house is not registered."
      ) {
        toast.error("The house is not registered. Please Register Above.");
      } else {
        toast.error("Error submitting payment. Please try again later.");
      }
    });
  

  };

  const handleHouseRegistration = () => {
    // Handle house registration logic here
    // You can navigate to the house registration page or perform any other action
    console.log('Registering the house...');
    

    const tenantHouseData = {
        tenant_id: tenantId,
        owner_id: ownerId,
        house_id: houseId,
    };

      axios.post('http://localhost:4000/tenanthouseregister', tenantHouseData)
      .then(response => {
        console.log('Registered successfully:', response.data);
        toast.success('Registered Successfully !! Please Proceed In Making Payments');
      })
      .catch(error => {
        console.error('Error Registering:', error);
        toast.error('Error Registering Please contact owner');
      });


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
              htmlFor="houseId"
              className="block text-gray-700 font-medium mb-2"
            >
              House ID
            </label>
            <input
              type="text"
              id="houseId"
              name="houseId"
              value={houseId}
              readOnly
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 bg-gray-200"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="tenantId"
              className="block text-gray-700 font-medium mb-2"
            >
              Tenant ID
            </label>
            <input
              type="text"
              id="tenantId"
              name="tenantId"
              value={tenantId}
              readOnly
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 bg-gray-200"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="rentAmount"
              className="block text-gray-700 font-medium mb-2"
            >
              Rent Amount
            </label>
            <input
              type="number" // Use type number for numeric input
              id="rentAmount"
              name="rentAmount"
              value={rentAmount}
              onChange={(e) => setRentAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-gray-700 font-medium mb-2"
            >
              Payment Date
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-600"
          >
            Make Payment
          </button>
          <div className="bg-red-100 p-4 rounded-md my-4">
            <p className="text-red-500 text-sm">
              If this is your first time making a payment, please register your house.
            </p>
          </div>
        </form>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 focus:ring-2 focus:ring-green-600 absolute top-4 right-4"
          onClick={handleHouseRegistration}
        >
          Register the House
        </button>
        
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
