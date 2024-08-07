import React, { useEffect, useState } from 'react';
import Logo from '../assets/images/logo.png'; // Default logo if no avatar is provided
import { toast } from 'react-toastify';
import CreateEmployee from '../Component/Employee/CreateEmployee';
import { deleteUserApi, getAllUsersApi } from '../Apis/Api';
import UserDetailModal from './UserDetailModal';

const AllEmployees = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user details
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUserApi(id);
      fetchUsers(); // After deleting, fetch users again to update the list
      toast.success('User deleted successfully');
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error('Failed to delete user');
    }
  };

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

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="p-4">
        <div className="pt-10 mt-3">
          {open && <CreateEmployee open={open} toggle={(val) => setOpen(val)} />}
          {isModalOpen && (
            <UserDetailModal
              user={selectedUser}
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}

          <div className='text-[#F97316] font-bold text-3xl'>All Employees</div>
          <div className='text-gray-600'>All Employees information</div>
          <div className='w-full flex justify-end mr-3 mt-3 mb-3'>
            <button
              className="btn bg-[#F97316] text-white p-2 flex gap-2 font-bold hover:bg-orange-700 rounded-md"
              onClick={() => setOpen(true)}
            >
              Add Employee
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded-xl mt-3">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Employee Name</th>
                  <th scope="col" className="px-6 py-3">Mail</th>
                  <th scope="col" className="px-6 py-3">Designation</th>
                  <th scope="col" className="px-6 py-3">Role</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-2">
                      <img src={user.avatar || Logo} alt="employee" className='h-10 w-10 rounded-full' />
                      <div className=''>{user.fName}</div>
                    </th>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.designation}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4 text-center flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#8b5cf6"
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => handleUserClick(user)}
                      >
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#30be83" className="w-6 h-6">
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                      </svg>
                      <button onClick={() => handleDelete(user._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="size-6">
                          <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllEmployees;
