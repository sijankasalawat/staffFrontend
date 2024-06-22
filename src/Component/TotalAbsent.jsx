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
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
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