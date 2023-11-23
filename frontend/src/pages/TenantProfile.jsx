import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.svg';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

export default function TenantProfile() {
  const [houses, setHouses] = useState([]);
  const tenantId = localStorage.getItem('tenant_id'); // Retrieve tenant_id from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    // Make an API request to fetch houses by tenant ID
    Axios.get(`http://localhost:4000/tenantprofile/houses?tenant_id=${tenantId}`)
      .then((response) => {
        setHouses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching houses:', error);
      });
  }, [tenantId]);
  
  const handleLeaveHouse = (houseId,ownerId) => {
    console.log('Leaving House :', houseId);
    
    const tenantHouseData = {
      owner_id: ownerId,
      house_id: houseId,
    };

    Axios.post('http://localhost:4000/leavehouse', tenantHouseData)
    .then(response => {
      console.log('Left House successfully:', response.data);
      toast.success('Left House. Thanks for being here.');
    })
    .catch(error => {
      console.error('Error Leaving:', error);
      toast.error('Error Leaving Please contact owner');
    });
    
  };

  const handleRentClick = (houseId,ownerId,rentAmount) => {
    console.log('Pay Rent house with ID:', houseId);
    navigate(`/payments/${houseId}/${ownerId}/${rentAmount}`);
  };
  
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute top-0 left-0 p-4">
        <img className="h-10 w-auto" src={Logo} alt="Your Company" />
      </div>

      <h1 className="my-4 text-4xl font-bold text-center">Hello Tenant, Your houses are:</h1>


      <div className="w-full max-w-screen-lg mt-8">
          {houses.map((house, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 mb-4 shadow-md border-l-4 border-indigo-500"
            >
              <p className="text-lg font-semibold mb-2">Address: {house.address}</p>
              <p>Owner ID: {house.owner_id}</p>
              <p>Rent Amount: {house.rent_amt}</p>
              <p>Number of Occupants: {house.number_of_occupants}</p>
              <p>City: {house.city}</p>
              <p>Contact Number: {house.contact_no}</p>
              <p>Property Type: {house.property_type}</p>
              <p>Description: {house.description}</p>
              <div className="mt-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-full mr-2"
                  onClick={() => handleRentClick(house.house_id,house.owner_id,house.rent_amt)}
                >
                  Pay Monthly Rent
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-full "
                  onClick={() => handleLeaveHouse(house.house_id,house.owner_id)}
                >
                  Leave House
                </button>
              </div>
            </div>
          ))}
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
  )
}
