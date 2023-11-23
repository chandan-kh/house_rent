import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';

export default function OwnerProfile() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    // Make an API request to fetch houses by owner ID
    Axios.get('http://localhost:4000/ownerprofile/houses')
      .then((response) => {
        setHouses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching houses:', error);
      });
  }, []);

  const handleDelete = async (house_id) => {
    try {
      await Axios.delete(`http://localhost:4000/house/` + house_id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute top-0 left-0 p-4">
        <img className="h-10 w-auto" src={Logo} alt="Your Company" />
      </div>

      <h1 className="my-4 text-4xl font-bold text-center">Hello Owner, Your houses are:</h1>


      <div className="w-full max-w-screen-lg mt-3">
      {houses.map((house, index) => (
        <div key={index} className="bg-white rounded-lg p-6 mb-4 shadow-md border-l-4 border-indigo-500">
          <p className="mb-2">
            <strong>Address:</strong> {house.address}
          </p>
          <p className="mb-2">
            <strong>Rent Amount:</strong> {house.rent_amt}
          </p>
          <p className="mb-2">
            <strong>Number of occupants:</strong> {house.number_of_occupants}
          </p>
          <p className="mb-2">
            <strong>City:</strong> {house.city}
          </p>
          <p className="mb-2">
            <strong>Contact Number:</strong> {house.contact_no}
          </p>
          <p className="mb-2">
            <strong>Property Type:</strong> {house.property_type}
          </p>
          <p className="mb-4">
            <strong>Description:</strong> {house.description}
          </p>

          <div className="flex justify-end space-x-4">
            <Link to={`/edithouse/${house.house_id}`} className="bg-indigo-500 text-white px-4 py-2 rounded">
              Edit
            </Link>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={(e) => handleDelete(house.house_id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
