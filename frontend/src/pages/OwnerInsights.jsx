import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../assets/logo.svg';
import { Pie, Bar } from 'react-chartjs-2';

import { Chart, ArcElement ,CategoryScale,LinearScale,BarElement } from 'chart.js';
Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);

const PaymentInsights = () => {
    const [paymentInsights, setPaymentInsights] = useState([]);
    const owner_id = localStorage.getItem('owner_id');

    useEffect(() => {
        const fetchPaymentInsights = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/paymentInsights/${owner_id}`);
                setPaymentInsights(response.data);
            } catch (error) {
                console.error('Error fetching payment insights:', error);
            }
        };

        if (owner_id) {
            fetchPaymentInsights();
        }
    }, [owner_id]);

    const totalRevenue = paymentInsights.reduce((total, insight) => total + (insight.income || 0), 0);

    const pieChartData = {
        labels: paymentInsights.map((insight) => `House ${insight.house_id}`),
        datasets: [{
            label : paymentInsights.map((insight) => `House ${insight.house_id}`),
            data: paymentInsights.map((insight) => insight.income || 0),
            backgroundColor: paymentInsights.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
        }]
    };

    const barChartData = {
        labels: paymentInsights.map((insight) => `House ${insight.house_id}`),
        datasets: [{
            label: 'Revenue',
            data: paymentInsights.map((insight) => insight.income || 0),
            backgroundColor: paymentInsights.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
        }]
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="absolute top-0 left-0 p-6">
                <img className="h-12 w-auto" src={Logo} alt="Your Company" />
            </div>
            <h1 className="my-6 text-4xl font-bold text-center">Payments Insights</h1>
            <div className="flex flex-col md:flex-row w-full justify-center items-center space-y-6 md:space-x-6">
                <div className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Income Distribution</h2>
                    <div className="w-full h-80">
                        <Pie data={pieChartData} />
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Revenue by House</h2>
                    <div className="w-full h-80">
                        <Bar data={barChartData} options={{ indexAxis: 'y' }} />
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 p-6 mt-6 bg-green-200 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Total Revenue Generated</h2>
                <div className="text-3xl font-bold">Rupees: {totalRevenue}</div>
            </div>
        </div>
    );
};

export default PaymentInsights;

