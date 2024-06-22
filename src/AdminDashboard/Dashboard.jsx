import React, { useState, useEffect } from 'react'
import BasicDateCalendar from '../Component/Calender'
import AllEvents from '../Component/AllEvents'
import { getAllUsersApi } from '../Apis/Api';
import { toast } from 'react-toastify';


const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsersApi();
      console.log('API Response:', res); // Log the response for debugging
      if (res.data && res.data.success) {
        setUsers(res.data.users);
      } else {
        toast.error('Failed to fetch employees');
      }
    } catch (err) {
      console.error('Error fetching employees:', err);
      toast.error('Failed to fetch employees');
    }
  };



  const totalEmployees = users.length; // Calculate total number of employees


  return (
    <>
     <div className="p-4">
     <div className=" pt-10 mt-3">
    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2'>
      <div className='lg:col-span-3'>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-5 '>
      <div className='border rounded-xl p-5 '>
      <div className='flex gap-3'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#F97316" className="w-10 h-10 bg-orange-50 p-2 rounded">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
        <div className='text-xl'>Total Employees</div>
      </div>
      <div className='text-3xl font-bold text-gray-600'>
        {totalEmployees}
      </div>
    </div>
        <div className='border rounded-xl p-5 '>
          <div className='flex gap-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F97316" class="w-10 h-10 bg-orange-50 p-2 rounded">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>

            <div className='text-xl'>Total Present</div>

          </div>
          <div className='text-3xl font-bold text-gray-600'>
            33
          </div>
        </div>
        <div className='border rounded-xl p-5 '>
          <div className='flex gap-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F97316" class="w-10 h-10 bg-orange-50 p-2 rounded">
              <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>

            <div className='text-xl'>Total Absent</div>

          </div>
          <div className='text-3xl font-bold text-gray-600'>
            33
          </div>
        </div>
        <div className='border rounded-xl p-5 '>
          <div className='flex gap-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F97316" class="w-10 h-10 bg-orange-50 p-2 rounded">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
            </svg>

            <div className='text-xl'>Total Project</div>

          </div>
          <div className='text-3xl font-bold text-gray-600'>
            8
          </div>
        </div>

      </div>

        </div>
        <div className='border rounded-xl p-3 '>
        <div className='text-xl font-bold text-gray-600 mb-2'> Today Date</div>
        <BasicDateCalendar />
        <AllEvents/>
        
      </div>
        
    </div>
  
      </div>
      </div>

    </>
  )
}

export default Dashboard