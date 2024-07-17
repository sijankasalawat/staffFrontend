import React, { useEffect, useState } from 'react';
import logo from "../assets/images/logo.png";

import CurrentDate from '../Component/CurrentDate';
import { useNavigate } from 'react-router-dom';
import EmpDashboard from './EmpDashboard';
import AddTicket from './AddTicket';
import AddDocument from '../Component/AddDocument/AddDocument';
import DropDown from '../Component/DropDown';
import Profile from '../profile/Profile';
import Project from '../Component/Project/Project';

const AdminDashboard = () => {
 
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user,setUser]=useState(localStorage.getItem('user') || {})
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();
  const [activeContainer, setActiveContainer] = useState('empdashboard');

  const handleContainerChange = (containerName) => {
    setActiveContainer(containerName);
  };
  useEffect(() => {
   
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
    if(user.role != 'employee'){
     
      if(user.role === 'hr'){
        navigate('/empdashboard');
    }else{
      navigate('employeeDashboard')
    }
  }
  },[])

  return (
    <>
     
      <div className=''>
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start rtl:justify-end">
                <button 
                  onClick={toggleSidebar} 
                  data-drawer-target="logo-sidebar" 
                  data-drawer-toggle="logo-sidebar" 
                  aria-controls="logo-sidebar" 
                  type="button" 
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg 
                    className="w-6 h-6" 
                    aria-hidden="true" 
                    fill="currentColor" 
                    viewBox="0 0 20 20" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      clipRule="evenodd" 
                      fillRule="evenodd" 
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button>
                <div className="flex ms-2 md:me-24">
                  <img src={logo} className="h-8 me-3" alt="Logo" />
                  <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white hidden lg:block">Staff Management System</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center ms-3">
                  <div className='lg:flex gap-2'>
                    <div className='hidden lg:block'>
                      <CurrentDate />
                    </div>
                    <button 
                      type="button" 
                      className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" 
                      aria-expanded="false" 
                    >
                      
                    </button>
                    <DropDown />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <aside 
          className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} bg-gray-100 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} 
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg- dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <button 
                  onClick={() => handleContainerChange('empdashboard')} 
                  className={`w-[100%] flex items-center p-2 text-gray-900 rounded-r-lg hover:bg-orange-100 dark:hover:bg-gray-700 group ${activeContainer === 'empdashboard' ? 'bg-orange-100 text-[#F97316] border-l-4 border-[#F97316]' : ''}`}
                >
                  <span className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-[#F97316] dark:group-hover:text-white`}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className={`w-6 h-6 ${activeContainer === 'empdashboard' ? 'text-[#F97316]' : ''}`}
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </span>
                  <div className={`ms-3 ${activeContainer === 'empdashboard' ? 'text-[#F97316]' : ''}`}>Dashboard</div>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleContainerChange('addticket')} 
                  className={`w-[100%] flex items-center p-2 text-gray-900 rounded-r-lg hover:bg-orange-100 dark:hover:bg-gray-700 group ${activeContainer === 'addticket' ? 'bg-orange-100 text-[#F97316] border-l-4 border-[#F97316]' : ''}`}
                >
                  <span className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-[#F97316] dark:group-hover:text-white`}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className={`w-6 h-6 ${activeContainer === 'addticket' ? 'text-[#F97316]' : ''}`}
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 22.5a12.696 12.696 0 0 1-6.337-2.434.75.75 0 0 1-.372-.568 6.738 6.738 0 0 1 1.02-4.381ZM15.75 13.5a5.238 5.238 0 0 0-2.559.672 9.007 9.007 0 0 1 2.53 2.427 9.005 9.005 0 0 1 2.53-2.427A5.238 5.238 0 0 0 15.75 13.5Zm-9.75.57a5.238 5.238 0 0 0-2.559.672 9.008 9.008 0 0 1 2.53 2.427 9.007 9.007 0 0 1 2.53-2.427A5.238 5.238 0 0 0 6 14.07Z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </span>
                  <div className={`ms-3 ${activeContainer === 'addticket' ? 'text-[#F97316]' : ''}`}>Request</div>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleContainerChange('document')} 
                  className={`w-[100%] flex items-center p-2 text-gray-900 rounded-r-lg hover:bg-orange-100 dark:hover:bg-gray-700 group ${activeContainer === 'document' ? 'bg-orange-100 text-[#F97316] border-l-4 border-[#F97316]' : ''}`}
                >
                  <span className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-[#F97316] dark:group-hover:text-white`}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className={`w-6 h-6 ${activeContainer === 'document' ? 'text-[#F97316]' : ''}`}
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M17.75 3a3.75 3.75 0 0 1 3.75 3.75v10.5A3.75 3.75 0 0 1 17.75 21H6.25A3.75 3.75 0 0 1 2.5 17.25V6.75A3.75 3.75 0 0 1 6.25 3h11.5Zm2.25 3.75a2.25 2.25 0 0 0-2.25-2.25H6.25a2.25 2.25 0 0 0-2.25 2.25v10.5c0 1.24 1.01 2.25 2.25 2.25h11.5a2.25 2.25 0 0 0 2.25-2.25V6.75Zm-13 7.5a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75Zm.75-3a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5Zm-.75-3a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75Z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </span>
                  <div className={`ms-3 ${activeContainer === 'document' ? 'text-[#F97316]' : ''}`}>Add Document</div>
                </button>
              </li>
              <li>
  <button 
    onClick={() => handleContainerChange('project')} 
    className={`w-[100%] flex items-center p-2 text-gray-900 rounded-r-lg hover:bg-orange-100 dark:hover:bg-gray-700 group ${activeContainer === 'project' ? 'bg-orange-100 text-[#F97316] border-l-4 border-[#F97316]' : ''}`}
  >
    <span className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-[#F97316] dark:group-hover:text-white`}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className={`w-6 h-6 ${activeContainer === 'project' ? 'text-[#F97316]' : ''}`}>
  <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
  <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
</svg>

    </span>
    <div className={`ms-3 ${activeContainer === 'project' ? 'text-[#F97316]' : ''}`}>Project</div>
  </button>
</li>

              <li>
                <button 
                  onClick={() => handleContainerChange('profilesetting')} 
                  className={`w-[100%] flex items-center p-2 text-gray-900 rounded-r-lg hover:bg-orange-100 dark:hover:bg-gray-700 group ${activeContainer === 'profilesetting' ? 'bg-orange-100 text-[#F97316] border-l-4 border-[#F97316]' : ''}`}
                >
                  <span className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-[#F97316] dark:group-hover:text-white`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"    className={`w-6 h-6 ${activeContainer === 'profilesetting' ? 'text-[#F97316]' : ''}`}>
  <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
</svg>

                  </span>
                  <div className={`ms-3 ${activeContainer === 'profilesetting' ? 'text-[#F97316]' : ''}`}>Profile Setting</div>
                </button>
              </li>
            
            </ul>
          </div>
        </aside>
        <div className="sm:ml-64">
         
          {activeContainer === 'empdashboard' && < EmpDashboard userId={user._id} />}
          {activeContainer === 'addticket' && <AddTicket />}
          {activeContainer === 'document' && <AddDocument userId={user._id}/>}
          {activeContainer === 'project' && <Project/>}
          {activeContainer === 'profilesetting' && <Profile userId={user._id} />}
          </div>
      
      </div>
    </>
  );
};

export default AdminDashboard;
