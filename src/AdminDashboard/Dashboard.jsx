import React, { useState, useEffect } from 'react'
import BasicDateCalendar from '../Component/Calender'
import AllEvents from '../Component/AllEvents'
import { getAllUsersApi } from '../Apis/Api';
import { toast } from 'react-toastify';
import AttendanceChart from '../Component/AttendanceBar';
import MonthlyAttendance from '../Component/MonthlyAttendance';
import TotalProject from '../Component/TotalProject';


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
     <div className="p-4 mt-5">
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
            8
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
           1
          </div>
        </div>
       <TotalProject/>

      </div>
      <div className='grid lg:grid-cols-2 gap-2 mt-4'>
        <AttendanceChart/>
        <MonthlyAttendance/>
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