import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function OwnerNotifications() {
  const [ownerAppointments, setOwnerAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Replace 'owner_id' with the actual owner_id of the logged-in owner
    const owner_id = localStorage.getItem('owner_id');; // Replace with the owner's ID

    axios.get(`http://localhost:4000/appointments/owner/${owner_id}`).then((response) => {
      setOwnerAppointments(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6">Owner Notifications</h1>

        {isLoading ? (
          <p className="text-center">Loading appointments...</p>
        ) : ownerAppointments.length === 0 ? (
          <p className="text-center">No appointments available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ownerAppointments.map((appointment) => (
              <div
                key={appointment.appointment_id}
                className="bg-white rounded-lg p-4 shadow-md border-l-4 border-indigo-500"
              >
                <p className="text-lg font-semibold mb-2">
                  Tenant ID: {appointment.tenant_id}
                </p>
                <p>House ID: {appointment.house_id}</p>
                <p>Appointment Date: {appointment.appointment_datetime}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
