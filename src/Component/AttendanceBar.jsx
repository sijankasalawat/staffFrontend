import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AttendanceBar = () => {
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Present',
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 1,
        hoverBackgroundColor: '#36A2EB',
        hoverBorderColor: '#36A2EB',
        data: [15, 10, 8, 12, 16], // Replace with actual data
      },
      {
        label: 'Absent',
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
        borderWidth: 1,
        hoverBackgroundColor: '#FF6384',
        hoverBorderColor: '#FF6384',
        data: [3, 5, 2, 1, 4], // Replace with actual data
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        scale: 'category',
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='border rounded-xl p-5'>
      <div className='text-xl mb-4'>Weekly Attendance</div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default AttendanceBar;
