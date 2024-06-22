import React, { useEffect, useState } from 'react'
import BasicDateCalendar from '../Component/Calender'
import AllEvents from '../Component/AllEvents'

import AttendanceChart from '../Component/AttendanceChart'
import TotalPresent from '../Component/TotalPresent'
import TotalAbsent from '../Component/TotalAbsent'
import { getTotalAbsentIdApi, getTotalPresentIdApi } from '../Apis/Api'


const EmpDashboard = ({ userId }) => {
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId) {
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
  return (
<>
<div className="p-4">
<div className=" pt-10 mt-3">
<div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2'>
      <div className='lg:col-span-3'>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-5 '>
      <TotalPresent userId={userId} />
      <TotalAbsent userId={userId} />
       
        <div className='border rounded-xl p-5 '>
          <div className='flex gap-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F97316" class="w-10 h-10 bg-orange-50 p-2 rounded">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
            </svg>

            <div className='text-xl'>Total Project</div>

          </div>
          <div className='text-3xl font-bold text-gray-600'>
            33
          </div>
        </div>
      

      </div>
      <div className='grid gap-3 lg:grid-cols-3 pt-3'>
     
      
         
      {error ? (
        <div className='text-red-600'>{error}</div>
      ) : (
        <AttendanceChart totalPresent={totalPresent} totalAbsent={totalAbsent} />
      )}
  
      <div className='lg:col-span-2'>
   
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

export default EmpDashboard