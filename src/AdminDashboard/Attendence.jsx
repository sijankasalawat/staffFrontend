import React, { useEffect, useState } from 'react';
import { getAllUsersApi, attendanceRecordApi } from '../Apis/Api';

const Attendence = () => {
  const [users, setUsers] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsersApi();
        if (response.data && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          console.error('Invalid response format for users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      const records = {};
      for (const user of users) {
        try {
          const response = await attendanceRecordApi({ id: user._id });
          if (response.data.success) {
            records[user._id] = response.data.attendances;
          } else {
            console.error(`Error fetching attendance records for user ${user._id}:`, response.data.message);
            records[user._id] = [];
          }
        } catch (error) {
          console.error(`Error fetching attendance record for user ${user._id}:`, error);
          records[user._id] = [];
        }
      }
      setAttendanceRecords(records);
    };

    fetchAttendanceRecords();
  }, [users]);

  return (
    <>
      <div>Today's Attendance:</div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded-xl mt-3">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Employee Name
              </th>
              <th scope="col" className="px-6 py-3">
                Designation
              </th>
              <th scope="col" className="px-6 py-3">
               Status
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-2">
                  <div className="">{user.username}</div>
                </td>
                <td className="px-6 py-4">{user.designation}</td>
                <td className="px-6 py-4 text-center flex gap-2">
                  {attendanceRecords[user._id]?.length ? (
                    attendanceRecords[user._id].map((attendance, index) => (
                      <span key={index}>{attendance.status}</span>
                    ))
                  ) : (
                    <span>No records found</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Attendence;
