import React, { useState, useEffect } from 'react'
import BasicDateCalendar from '../Component/Calender'
import AllEvents from '../Component/AllEvents'
import TotalPresent from '../Component/TotalPresent'
import AttendanceChart from '../Component/AttendanceChart'
import AttendanceBar from '../Component/AttendanceBar'
import TotalAbsent from '../Component/TotalAbsent'
import { getTotalAbsentIdApi, getTotalPresentIdApi } from '../Apis/Api'
import TotalProject from '../Component/TotalProject'


const HrDashboardMain = ({ userId }) => {
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
    }
  }, [userId]);
  return (
    <>
    <div className="p-4 mt-3">
    <div className=" pt-10 mt-3">
    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2'>
      <div className='lg:col-span-3'>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-5 '>
        <TotalPresent userId={userId} />
     <TotalAbsent userId={userId} />
  
       
       <TotalProject/>
      

      </div>
      <div className='grid gap-3 lg:grid-cols-3 pt-3'>
     
     
      {error ? (
        <div className='text-red-600'>{error}</div>
      ) : (
        <AttendanceChart totalPresent={totalPresent} totalAbsent={totalAbsent} />
      )}
  
    
      <div className='lg:col-span-2'>
      <AttendanceBar userId={userId}/>  
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

export default HrDashboardMain