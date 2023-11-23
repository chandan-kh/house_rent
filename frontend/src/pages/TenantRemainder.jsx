import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from '../assets/logo.svg';

const PaymentReminders = () => {
    const storedTenantId = localStorage.getItem('tenant_id');
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        if (storedTenantId) {
            axios.get(`http://localhost:4000/paymentreminders/${storedTenantId}`)
                .then(response => {
                    // Extract and format the date portion from the API response
                    const formattedReminders = response.data.map(reminder => {
                        return {
                            ...reminder,
                            next_payment_due_date: new Date(reminder.next_payment_due_date).toLocaleDateString()
                        };
                    });
                    setReminders(formattedReminders);
                })
                .catch(error => {
                    console.error('Error fetching payment reminders:', error);
                });
        }
    }, [storedTenantId]);

    return (
        <div className="flex flex-col items-center mt-8">
            <div className="absolute top-0 left-0 p-4">
                <img className="h-10 w-auto" src={Logo} alt="Your Company" />
            </div>
            <h1 className="my-4 text-4xl font-bold text-center">Payment Reminders</h1>

            <div className="bg-white rounded-lg p-6 mb-4 shadow-md border-l-4 border-yellow-500">
                <ul className="list-none text-xl p-0">
                    {reminders.map(reminder => (
                        <li key={reminder.reminder_id} className="flex items-center my-2">
                            <div className="bg-gray-200 rounded-md p-2 mr-4">House ID {reminder.house_id}</div>
                            <div className="bg-gray-200 rounded-md p-2">Next Payment Due: {reminder.next_payment_due_date}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PaymentReminders;


