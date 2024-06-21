import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceChart = ({ totalPresent, totalAbsent }) => {
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    responsive: true,
    height: 250,
  };

  return (
    <div className='border rounded-xl p-5 h-[450px]'>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default AttendanceChart;
