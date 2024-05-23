import React,{useState,useEffect} from 'react'
import { getUserByIdApi } from '../Apis/Api';

const AttendenceCheck = () => {
    const [userId, setUserId] = useState('');
    const [userDetails, setUserDetails] = useState({ username: '', designation: '' });
    useEffect(() => {
        getAllUsers();
        const fetchUserDetails = async () => {
          if (userId) {
            try {
              const response = await getUserByIdApi(userId);
              if (response.data.success) {
                setUserDetails({
                  username: response.data.data.username, // Assuming the user object has 'username'
                  designation: response.data.data.designation, // Assuming the user object has 'designation'
                });
              } else {
                setUserDetails({ username: '', designation: '' });
                console.error(response.data.message);
              }
            } catch (error) {
              setUserDetails({ username: '', designation: '' });
              console.error('Error fetching user details:', error.response ? error.response.data.message : error.message);
            }
          }
        };
    
        fetchUserDetails();
      }, [userId]);

      const getAllUsers = () => {
        getAllUsers(userId);
      }
  return (
   <>
    <div className='text-[#F97316] font-bold text-3xl'>Attendence</div>

<div className='text-gray-600'>All Employees attendence</div>



<div class="relative overflow-x-auto shadow-md sm:rounded-lg rounded-xl mt-3">
  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">
          Employee Name 
        </th>
      
        <th scope="col" class="px-6 py-3">
          Designation
        </th>
      
        <th scope="col" class="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-2">
          {/* <div className=''>{users.username}</div> */}
        </td>
     
        <td class="px-6 py-4">
        {/* {users.designation} */}
        </td>
      
        <td class="px-6 py-4 text-center flex gap-2">

        <div class="flex items-center mb-4">
    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
</div>

        </td>
      </tr>

    </tbody>
  </table>
</div>
   </>
  )
}

export default AttendenceCheck