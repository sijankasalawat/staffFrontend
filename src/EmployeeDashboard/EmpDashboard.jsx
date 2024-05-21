import React from 'react'
import BasicDateCalendar from '../Component/Calender'

const EmpDashboard = () => {
  return (
<>
    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-5 '>
    <div className='border rounded-xl p-5 '>
      <div className='flex gap-3'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8D75F5" class="w-10 h-10 bg-[#f8f6fe] p-2 rounded">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
</svg>

        <div className='text-xl'>Total Present</div>

      </div>
      <div className='text-3xl font-bold text-gray-600'>
        33
      </div>
    </div>
    <div className='border rounded-xl p-5 '>
      <div className='flex gap-3'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8D75F5" class="w-10 h-10 bg-[#f8f6fe] p-2 rounded">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
</svg>


        <div className='text-xl'>Total Absent</div>

      </div>
      <div className='text-3xl font-bold text-gray-600'>
        33
      </div>
    </div>
    <div className='border rounded-xl p-5 '>
      <div className='flex gap-3'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8D75F5" class="w-10 h-10 bg-[#f8f6fe] p-2 rounded">
  <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
  <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
</svg>


        <div className='text-xl'>Total Document</div>

      </div>
      <div className='text-3xl font-bold text-gray-600'>
        33
      </div>
    </div>
    <div className='border rounded-xl p-5 '>
      <div className='flex gap-3'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#8D75F5" class="w-10 h-10 bg-[#f8f6fe] p-2 rounded">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
        </svg>

        <div className='text-xl'>Total Project</div>

      </div>
      <div className='text-3xl font-bold text-gray-600'>
        33
      </div>
    </div>

  </div>
  <div className='grid lg:grid-cols-4 gap-5 mt-3'>
    <BasicDateCalendar />
  </div>
  </>
  )
}

export default EmpDashboard