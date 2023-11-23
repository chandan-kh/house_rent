import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TenantLanding() {
  const [location, setLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [rent, setRent] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    setIsSearching(true);

    axios
      .get(
        `http://localhost:4000/search/houses?location=${encodeURIComponent(
          location
        )}&rent=${encodeURIComponent(rent)}`
      )
      .then((response) => {
        setSearchResults(response.data);
        setIsSearching(false);
      })
      .catch((error) => {
        console.error("Error searching houses:", error);
        setIsSearching(false);
      });
  };

  const storedTenantId = localStorage.getItem("tenant_id");

  const handleProfileClick = () => {
    navigate("/tenantprofile"); // Navigate to the 'registerowner' route
  };

  const handleRemainderClick = () => {
    navigate("/tenantreminders");
  };

  const handleAppointmentClick = (houseId,ownerId) => {
    // Make a POST request to create an appointment
    axios
      .post('http://localhost:4000/appointments', {
        tenant_id: storedTenantId, // You should have tenant_id available in your frontend
        owner_id: ownerId,  // You may need to get owner_id from the house object
        house_id: houseId,
      })
      .then((response) => {
        console.log('Appointment created successfully');
        toast.success('Appointment Send Successfully');
        // Handle any success actions (e.g., showing a success message)
      })
      .catch((error) => {
        console.error('Error creating appointment:', error);
        // Handle any error actions (e.g., showing an error message)
      });
  };
  

  const handleRentClick = (houseId, ownerId, rentAmount) => {
    console.log("Rent house with ID:", houseId);
    navigate(`/payments/${houseId}/${ownerId}/${rentAmount}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-16">
      <div className="absolute top-0 left-0 p-4">
        <img className="h-10 w-auto" src={Logo} alt="Your Company" />
      </div>

      <div className="w-full flex justify-end fixed top-4 right-4 hover:cursor-pointer">
        {/* Profile Icon (replace 'profile.jpg' with your actual profile image URL) */}
        <img
          src="bell.png"
          alt="Bell Icon"
          className="w-10 h-10 text-gray-600 mr-4"
          onClick={handleRemainderClick}
        />
        <img
          src="profileicon.png"
          alt="Profile Icon"
          className="w-10 h-10 rounded-full"
          onClick={handleProfileClick}
        />
      </div>

      <div className="flex flex-col items-center space-y-8">
        {/* Input Fields and Search Button */}
        <div className="flex items-center space-x-4">
          <label
            htmlFor="tenant_id"
            className="block font-medium text-gray-700 mr-2"
          >
            Tenant ID
          </label>
          <input
            type="text"
            id="tenant_id"
            name="tenant_id"
            value={storedTenantId}
            readOnly
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 bg-gray-200"
          />
          <select
            id="propertyType"
            name="propertyType"
            placeholder="House Type"
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          >
            <option value="">Select Property Type</option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
            <option value="Others">Others</option>
          </select>

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          />

          <input
            type="text"
            placeholder="Rent"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          />

          <button
            onClick={handleSearch}
            className="bg-indigo-500 text-white px-4 py-2 rounded-full focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Display Search Results */}
        <div className="w-full max-w-screen-lg mt-8">
          {searchResults.map((house, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 mb-4 shadow-md border-l-4 border-indigo-500"
            >
              <p className="text-lg font-semibold mb-2">
                Address: {house.address}
              </p>
              <p>Owner ID: {house.owner_id}</p>
              <p>Rent Amount: {house.rent_amt}</p>
              <p>Number of Occupants: {house.number_of_occupants}</p>
              <p>City: {house.city}</p>
              <p>Contact Number: {house.contact_no}</p>
              <p>Property Type: {house.property_type}</p>
              <p>Description: {house.description}</p>
              <div className="mt-4 flex items-center">
                <button
                  className={`px-4 py-2 rounded-full mr-2 ${
                    house.tenant_id !== null
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-indigo-500 text-white hover:bg-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  }`}
                  onClick={() => handleAppointmentClick(house.house_id,house.owner_id)}
                  disabled={house.tenant_id !== null} // Disable the button if tenant_id is not null (house is booked)
                >
                  Ask Appointment
                </button>
                <button
                  className={`px-4 py-2 rounded-full mr-2 ${
                    house.tenant_id !== null
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-indigo-500 text-white hover:bg-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  }`}
                  onClick={() =>
                    handleRentClick(
                      house.house_id,
                      house.owner_id,
                      house.rent_amt
                    )
                  }
                  disabled={house.tenant_id !== null} // Disable the button if tenant_id is not null (house is booked)
                >
                  Rent House
                </button>
                {house.tenant_id !== null && (
                  <img
                    src="booked.png"
                    alt="Booked Icon"
                    className="w-14 h-14 ml-3"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
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
