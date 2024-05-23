import React, { useState, useEffect } from 'react';
import { getAllUsersApi, markAttendanceApi, updateAttendanceApi } from '../Apis/Api';
import { toast } from 'react-toastify';

const AttendenceCheck = () => {
  const [users, setUsers] = useState([]);
  const [saving, setSaving] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    // Retrieve attendance data from local storage when component mounts
    const savedAttendance = JSON.parse(localStorage.getItem('attendanceData'));
    if (savedAttendance) {
      setUsers(savedAttendance);
      // Check if attendance is already marked for any user
      if (savedAttendance.some(user => user.attendanceMarked)) {
        setUpdateMode(true);
      }
    } else {
      fetchUsers(); // Fetch users if no saved data is found
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsersApi();
      if (response.data.success) {
        const usersWithAttendance = response.data.users.map(user => ({
          ...user,
          attendanceStatus: 'Absent',
          attendanceMarked: false,
        }));
        setUsers(usersWithAttendance);
        // Check if attendance is already marked for any user
        if (usersWithAttendance.some(user => user.attendanceMarked)) {
          setUpdateMode(true);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error fetching users:', error.response ? error.response.data.message : error.message);
    }
  };

  const handleAttendanceChange = (userId, isChecked) => {
    setUsers(users.map(user =>
      user._id === userId ? { ...user, attendanceStatus: isChecked ? 'Present' : 'Absent' } : user
    ));
  };

  const saveAttendance = async () => {
    try {
      setSaving(true);

      const responses = await Promise.all(users.map(user =>
        user.attendanceMarked
          ? updateAttendanceApi({ userId: user._id, status: user.attendanceStatus })
          : markAttendanceApi({ userId: user._id, status: user.attendanceStatus })
      ));
      let allSuccess = true; // Flag to track if all responses were successful
      responses.forEach((response, index) => {
        if (!response.data.success) {
          allSuccess = false;
          toast.error(response.data.message);
        } else {
          // Update attendance marked status if successful
          setUsers(users.map((user, i) => 
            i === index ? { ...user, attendanceMarked: true } : user
          ));
        }
      });
      
      if (allSuccess) {
        toast.success(`Attendance ${updateMode ? 'updated' : 'saved'} successfully`);
        // Save attendance data to local storage
        localStorage.setItem('attendanceData', JSON.stringify(users));
      }

    } catch (error) {
        console.error('Error saving attendance:', error);
        toast.error('Error saving attendance: Unable to save attendance. Please try again later.');
      } finally {
        setSaving(false);
      }
  };
 return (
    <>
      <div className='text-[#F97316] font-bold text-3xl'>Attendance</div>
      <div className='text-gray-600'>All Employees Attendance</div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded-xl mt-3">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">SN</th>
              <th scope="col" className="px-6 py-3">Employee Name</th>
              <th scope="col" className="px-6 py-3">Designation</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </td>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-2">
                  <div>{user.username}</div>
                </td>
                <td className="px-6 py-4">{user.designation}</td>
                <td className="px-6 py-4 text-center flex gap-2">
                  <div className="flex items-center mb-4">
                    <input 
                      id={`checkbox-${user._id}`} 
                      type="checkbox" 
                      onChange={(e) => handleAttendanceChange(user._id, e.target.checked)}
                      disabled={user.attendanceMarked}
                      checked={user.attendanceStatus === 'Present'}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor={`checkbox-${user._id}`} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Present
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex justify-end m-3 '>
          <button 
            className='btn p-2 px-4 bg-[#F97316] text-white rounded-md font-bold hover:bg-purple-800' 
            onClick={saveAttendance}
            disabled={saving} // Disable the button if saving is in progress
          >
            {updateMode ? 'Update Attendance' : 'Save Attendance'}
          </button>
        </div>
      </div>
    </>
  );
  
  
};

export default AttendenceCheck;
