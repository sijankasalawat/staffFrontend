import React, { useEffect, useState } from 'react';
import { getTotalPresentIdApi, getTotalAbsentIdApi } from '../Apis/Api'; // Adjust the import path as needed
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceChart = ({ userId }) => {
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId) {
      console.log(`Using user ID: ${userId}`);

      // Fetch total present days
      getTotalPresentIdApi(userId)
        .then(response => {
          if (response.data.success) {
            setTotalPresent(response.data.totalPresent);
          } else {
            setError(response.data.message);
          }
        })
        .catch(err => {
          console.error('Error fetching total present days:', err);
          setError('Error fetching total present days');
        });

      // Fetch total absent days
      getTotalAbsentIdApi(userId)
        .then(response => {
          if (response.data.success) {
            setTotalAbsent(response.data.totalAbsent);
          } else {
            setError(response.data.message);
          }
        })
        .catch(err => {
          console.error('Error fetching total absent days:', err);
          setError('Error fetching total absent days');
        });
    } else {
      setError('Invalid user ID');
    }
  }, [userId]);

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

  return (
    <div className='border rounded-xl p-5'>
      {error ? (
        <div className='text-red-600'>{error}</div>
      ) : (
        <Doughnut data={data} />
      )}
    </div>
  );
};

export default AttendanceChart;
