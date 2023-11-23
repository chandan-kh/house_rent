import React,{useState} from 'react'
import Logo from "../assets/logo.svg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function EditHouse() {
  const storedOwnerId = localStorage.getItem('owner_id');
  const navigate = useNavigate();
  const [values ,setValues] = useState({
    address:'',
    rentAmount:'',
    occupants:'',
    city:'',
    contactNumber:'',
    propertyType:'',
    description:'',
    image:'',
    owner_id: storedOwnerId || ''
  })

  const { house_id } = useParams();
  
  const handleChange = (event) =>{
     setValues({...values , [event.target.name] : [event.target.value]})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put('http://localhost:4000/edithouse/'+house_id,values)
    .then(res => {
      console.log(res);
      console.log(house_id);
      navigate('/ownerprofile');
    })
    .catch(err => console.error(err));
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="absolute top-0 left-0 p-4">
        <img className="h-10 w-auto" src={Logo} alt="Your Company" />
      </div>

      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 gap-4 mx-auto max-w-screen-lg p-10">
          <form
            className="grid grid-cols-2 gap-10 mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="col-span-1">
              <label
                htmlFor="address"
                className="block font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="rentAmount"
                className="block font-medium text-gray-700"
              >
                Rent Amount
              </label>
              <input
                type="number"
                id="rentAmount"
                name="rentAmount"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="occupants"
                className="block font-medium text-gray-700"
              >
                Number of Occupants
              </label>
              <input
                type="number"
                id="occupants"
                name="occupants"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="city" className="block font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="contactNumber"
                className="block font-medium text-gray-700"
              >
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="propertyType"
                className="block font-medium text-gray-700"
              >
                Property Type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                onChange={handleChange}
              >
                <option value="">Select Property Type</option>
                <option value="1BHK">1BHK</option>
                <option value="2BHK">2BHK</option>
                <option value="3BHK">3BHK</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="description"
                className="block font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="image"
                className="block font-medium text-gray-700"
              >
                Add Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="owner_id"
                className="block font-medium text-gray-700"
              >
                Owner ID
              </label>
              <input
                type="text"
                id="owner_id"
                name="owner_id"
                value={values.owner_id}
                readOnly // This makes the input field read-only
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 bg-gray-200"
              />
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                className="w-full p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-200"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
