import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceChart = () => {
  const totalPresent = 10; // Static value for present days
  const totalAbsent = 2;   // Static value for absent days
  const error = '';        // No error handling for static values

  const data = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: '# of Days',
        data: [totalPresent, totalAbsent],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Ensures chart isn't constrained to a fixed aspect ratio
    plugins: {
      legend: {
        position: 'bottom', // Adjust legend position as needed
      },
    },
    responsive: true,
    height: 250, // Set the height of the chart
  };

  return (
    <div className='border rounded-xl p-5 h-[450px]' >
      {error ? (
        <div className='text-red-600'>{error}</div>
      ) : (
        <Doughnut data={data} options={options} />
      )}
    </div>
  );
};

export default AttendanceChart;
