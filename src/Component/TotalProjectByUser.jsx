import React, { useEffect, useState } from 'react';
import { getProjectsByUsernameApi } from '../Apis/Api'; // Adjust the import path accordingly
import ReactLoading from 'react-loading';

const TotalProjectByUser = () => {
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const username = JSON.parse(localStorage.getItem('user')).username;

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const { data } = await getProjectsByUsernameApi(username);
        if (data.success) {
          setProjectCount(data.projects.length);
        } else {
          setError(data.message || 'Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Error fetching projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [username]);

  return (
    <div className='border rounded-xl p-5'>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <ReactLoading type="spin" color="#F97316" height={'50px'} width={'50px'} />
        </div>
      ) : (
        <>
          <div className='flex gap-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#F97316" className="w-10 h-10 bg-orange-50 p-2 rounded">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
            </svg>
            <div className='text-xl'>Total Project</div>
          </div>
          <div className='text-3xl font-bold text-gray-600'>
            {error ? (
              <div className="text-red-600">{error}</div>
            ) : (
              projectCount
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TotalProjectByUser;
