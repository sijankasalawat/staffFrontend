import React,{useState} from 'react'
import { toast } from 'react-toastify';
import {  changePasswordApi } from "../../Apis/Api";
const ChangePassword = () => {
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('user'))._id);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
     
 // Change password
 const handleChangePassword = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!oldPassword) {
      setOldPasswordError("Old password is required.");
      isValid = false;
    } else {
      setOldPasswordError("");
    }

    if (!newPassword) {
      setNewPasswordError("New password is required.");
      isValid = false;
    } else {
      setNewPasswordError("");
    }

    if (!isValid) return;

    try {
      const response = await changePasswordApi(userId, { oldPassword, newPassword });

      if (response.success) {
        toast.success("Password changed successfully!");
        setOldPassword('');
        setNewPassword('');
        setOldPasswordError('');
        setNewPasswordError('');
      } else {
        toast.error(response.message || "Failed to change password.");
      }
    } catch (error) {
      toast.error("An error occurred while changing the password.");
    }
  };
  return (
    <div className='p-4 bg-white shadow-md rounded-md mt-3 h-fit'>
    <div className='text-gray-600 font-bold'>Change Password</div>
  
    <form onSubmit={handleChangePassword} className='grid lg:grid-cols-2 gap-4'>
      <div className="div">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Old Password
        </label>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
        />
        {oldPasswordError && (
          <div className="text-red-500 text-sm mt-1">{oldPasswordError}</div>
        )}
      </div>
      <div className="div">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          New Password
        </label>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
        />
        {newPasswordError && (
          <div className="text-red-500 text-sm mt-1">{newPasswordError}</div>
        )}
      </div>
      <div className="lg:col-span-2">
        <button
          type="submit"
          className="bg-orange-400 w-full lg:w-auto px-3 rounded-md border-0 py-1.5 pl-5 pr-5 mb-2 hover:bg-orange-600 text-white"
        >
          Change Password
        </button>
      </div>
    </form>
  </div>

  )
}

export default ChangePassword