import React, { useEffect, useState } from 'react';
import { getTotalAbsentIdApi } from '../Apis/Api'; // Adjust the import path as needed

const TotalAbsent = ({ userId }) => {
  const [totalAbsent, setTotalAbsent] = useState('0');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('userId: ', userId);
    if (userId) {
      console.log(`Using user ID: ${userId}`); // Log the user ID
      getTotalAbsentIdApi(userId)
        .then(response => {
          if (response.data.success) {
            setTotalAbsent(response.data.totalAbsent);
          } else {
            setError(response.data.message);
          }
        })
        .catch(err => {
          console.error('Error fetching total present days:', err);
          setError('Error fetching total present days');
        });
    } else {
      setError('Invalid user ID');
    }
  }, [userId]);

  return (
    <div className='border rounded-xl p-5'>
      <div className='flex gap-3'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#F97316" className="w-10 h-10 bg-orange-50 p-2 rounded">
  <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>

        <div className='text-xl'>Total Absent</div>
      </div>
      <div className='text-3xl font-bold text-gray-600'>
        {totalAbsent !== null ? totalAbsent : 'N/A'}
      </div>
    </div>
  );
};

export default TotalAbsent;
