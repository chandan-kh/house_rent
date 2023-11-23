import React, { useState, useEffect } from "react";
import axios from "axios";

const BuildingList = () => {
  const ownerId = localStorage.getItem('owner_id');
  const [buildings, setBuildings] = useState([]);
  const [waterUsage, setWaterUsage] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:4000/buildings/${ownerId}`)
      .then((response) => {
        const groupedBuildings = groupBy(response.data, 'building_id');
        setBuildings(groupedBuildings);
      })
      .catch((error) => {
        console.error("Error fetching buildings: ", error);
      });
  }, [ownerId]);

  // Function to group buildings by building_id
  const groupBy = (data, key) => {
    return data.reduce((acc, obj) => {
      const property = obj[key];
      if (!acc[property]) {
        acc[property] = [];
      }
      acc[property].push(obj);
      return acc;
    }, {});
  };

  const handleCalculateWaterBill = (buildingId) => {
    const totalOccupants = buildings[buildingId].reduce((acc, house) => {
      return acc + house.number_of_occupants;
    }, 0);

    const individualUsage = waterUsage / totalOccupants;

    const updatedBuildings = buildings[buildingId].map((house) => {
      const dividedAmount = individualUsage * house.number_of_occupants;
      return {
        ...house,
        waterBill: dividedAmount.toFixed(2), // Rounded to 2 decimal places
      };
    });

    const updatedBuildingsList = {
      ...buildings,
      [buildingId]: updatedBuildings,
    };

    setBuildings(updatedBuildingsList);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Buildings Owned by Owner ID: {ownerId}</h1>
      <div className="space-y-4">
        {Object.keys(buildings).map((buildingId) => {
          if (buildingId !== "null") {
            return (
              <div key={buildingId} className="bg-white rounded-lg p-6 mb-4 shadow-md border-l-4 border-indigo-500 relative">
                <h2 className="text-xl font-bold mb-2">Building ID: {buildingId}</h2>
                <ul>
                  {buildings[buildingId].map((house) => (
                    <li key={house.house_id} className="mb-2">
                      <strong>House ID:</strong> {house.house_id}, <strong>Number of Occupants:</strong> {house.number_of_occupants}
                      {house.tenant_id && (
                        <span>, <strong>Tenant ID:</strong> {house.tenant_id}</span>
                      )}
                      {house.waterBill && (
                        <span>, <strong>Water Bill:</strong> Rupees : {house.waterBill}</span>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="absolute bottom-2 right-2">
                  <input
                    type="number"
                    placeholder="Enter water usage"
                    className="border rounded-l p-2"
                    value={waterUsage}
                    onChange={(e) => setWaterUsage(e.target.value)}
                  />
                  <button
                    onClick={() => handleCalculateWaterBill(buildingId)}
                    className="bg-indigo-500 text-white rounded-r p-2 hover:bg-indigo-600"
                  >
                    Calculate Water Bill
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default BuildingList;
