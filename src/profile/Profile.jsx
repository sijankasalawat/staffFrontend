import React, { useEffect, useRef, useState } from "react";
import profile from "../assets/images/logo.png";
import bg from "../assets/images/bg.png";
import id from "../assets/images/id.png"

import { toast } from "react-toastify";
import { getUserByIdApi, updateUserApi, } from "../Apis/Api";
import ChangePassword from "../Component/ChangePassword/ChangePassword";

const Profile = () => {
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('user'))._id);






  console.log('userId: ', userId);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUser((prevUser) => ({ ...prevUser, avatar: file }));
  };


  const initialUserState = {
    fName: "",
    lName: "",
    email: "",
    phoneNumber: "",
    address: "",
    avatar: "",
  };

  const [user, setUser] = useState(initialUserState);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserByIdApi(userId);

        console.log("getUserByIdApi response: ", res);

        if (!res.data || !res.data.success) {
          const errorMessage = res.data ? res.data.message : "Unexpected response format";
          toast.error(errorMessage);
        } else {
          setUser(res.data.user);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        toast.error("Internal server error");
      }
    };

    if (userId) {
      fetchUser();
    } else {
      toast.error("User ID is missing");
    }
  }, [userId]);

  const handleUserUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", userId); // Include userId here
      formData.append("fName", user.fName);
      formData.append("lName", user.lName);
      formData.append("email", user.email);
      formData.append("phoneNumber", user.phoneNumber);
      formData.append("address", user.address);

      // Append avatar if it's a File object
      if (user.avatar instanceof File) {
        formData.append("avatar", user.avatar);
      }

      // Call your updateUserApi with formData
      const res = await updateUserApi(formData, userId);

      // Assuming your API response has a success message
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Internal server error");
    }
  };


  const placeholderAvatar = "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

  return (
    <div className='bg-cover bg-center h-screen' style={{ backgroundImage: `url(${bg})` }}>
      <div className='p-4 pt-5'>
        <div className='pt-10 mt-3'>
          <div className='lg:mt-[40px] mt-[20px]'>
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-4'>
            <div className='border shadow-md rounded-md bg-white' style={{backgroundImage: `url(${id})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
            <div className='flex justify-center mt-5'>
                  <div className="profile-image w-30 flex justify-center" onClick={handleImageClick}>
                    <img
                      src={user.avatar || placeholderAvatar}
                      className="w-[200px] h-[200px] object-contain rounded-full"
                      alt="User Profile"
                      onError={(e) => console.error("Image loading error", e)}
                    />

                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={(e) => handleFileChange(e)}
                    />
                  </div>
                </div>
                <div className='mt-2 text-3xl text-gray-600 font-bold text-center'>
                  {user.fName} {user.lName}
                </div>
                <div className='p-3 px-5'>
                  <div className='flex gap-2 p-2 pt-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="size-6">
                      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                    </svg>
                    <div>{user.email}</div>
                  </div>
                  <div className='flex gap-2 p-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="size-6">
                      <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                    </svg>
                    <div>{user.address}</div>
                  </div>
                  <div className='flex gap-2 p-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="size-6">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                    </svg>
                    <div>{user.phoneNumber}</div>
                  </div>
                </div>
                <div className=" text-orange-500 bottom-0 left-0 px-6 flex gap-3 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" class="size-6">
  <path fill-rule="evenodd" d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z" clip-rule="evenodd" />
</svg>

<div className="text-orange-500 bottom-0 left-0 font-bold">ID: {user && user._id ? `00${user._id.slice(-2)}` : ''}</div>
</div>
              </div>
              <div className='col-span-2'>
                <div className='p-4 bg-white shadow-md rounded-md h-fit'>
                  <div className='text-[#F97316] font-bold text-3xl'>Profile Setting</div>
                  <div className='text-gray-600 font-bold'>Update Your Profile</div>
                  <div className='grid lg:grid-cols-2 gap-4'>
                    <div className="div">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        First Name
                      </label>
                      <input
                        onChange={(event) => setUser((user) => ({ ...user, fName: event.target.value }))}
                        value={user.fName}
                        placeholder="your First name"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="div">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Last Name
                      </label>
                      <input
                        onChange={(event) => setUser((user) => ({ ...user, lName: event.target.value }))}
                        value={user.lName}
                        placeholder="your last name"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="div">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Email
                      </label>
                      <input
                        onChange={(event) => setUser((user) => ({ ...user, email: event.target.value }))}
                        value={user.email}
                        placeholder="your email"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="div">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Address
                      </label>
                      <input
                        onChange={(event) => setUser((user) => ({ ...user, address: event.target.value }))}
                        value={user.address || ''}
                        placeholder="Address"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="div">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Phone Number
                      </label>
                      <input
                        onChange={(event) => setUser((user) => ({ ...user, phoneNumber: event.target.value }))}
                        value={user.phoneNumber}
                        placeholder="phone number"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <button onClick={handleUserUpdate} className="bg-orange-400 w-full lg:w-auto px-3 rounded-md border-0 py-1.5 pl-5 pr-5 mb-2 hover:bg-orange-600 text-white">
                    Update Profile
                  </button>
                </div>
                <ChangePassword/>


              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
