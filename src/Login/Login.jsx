import React,{useState} from 'react'
import ParticlesComponent from '../Component/ParticlesComponent'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/images/logo.png'
import "./Login.css"
import { toast, ToastContainer } from "react-toastify";
import { loginApi } from '../Apis/Api'
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handelUserName =(e)=>{
    setUsername(e.target.value);
  }

  const handelPassword =(e)=>{
    setPassword(e.target.value);
  }

  const handelSubmit = async (e) => {
    try{

      e.preventDefault();
      const data = [
        username,
        password
      ];
      loginApi(data).then((res)=>{
        if(res.data.success == true){
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          const convertedJson = JSON.stringify(res.data.user);
          localStorage.setItem("user", convertedJson);
          if(res.data.user.admin === true){
            window.location.href = "/admindashboard"; 

          }else{
            window.location.href = "/dashboard";
          }
        }else{
          toast.error(res.data.message);
        }
      });
 
    }catch(error){
          console.log(error)
      toast.error(error?.response?.data?.message || error?.message || "Something went wrong.")
    }

  
    
  }
  return (
    <div >
      {/* <ParticlesComponent/> */}
        <div className='loginBodys  h-[100vh] w-[100%] flex justify-center items-center absolute'>


<div className='  lg:h-[80%] lg:w-[30%] md:w-[50%] md:h-[80%] h-[90%] sm:w-[90%]  flex justify-center  rounded-xl bg-[#cfc6fd]'>
  <div className='w-full'>
    <div className='flex justify-center w-full'>
      <img src={Logo} alt="logo" className='h-20 w-20 mt-[15%]' />
    </div>

    <div className='text-center text-2xl font-bold mt-3 '>Welcome to Staff Management System👋 </div>
    <div className='text-center'>Please login to your account</div>
    <div class="relative mt-10 min-w-[200px] h-10 mx-10">
      <div class="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" class="w-6 h-6">
          <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
        </svg>

      </div>
      <input onChange={handelUserName}
        class="peer w-full  h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0  focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-[#8D75F5]"
        placeholder=" " /><label
          class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-[#8D75F5] before:border-blue-gray-200 peer-focus:before:!border-[#8D75F5] after:border-blue-gray-200 peer-focus:after:!border-[#8D75F5]">
        User Name
      </label>
    </div>
    <div class="relative mt-5 min-w-[200px] h-10 mx-10">
      <div class="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" class="w-6 h-6">
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
        </svg>


      </div>
      <input onChange={handelPassword}
        class="peer w-full  h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0  focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-[#8D75F5]"
        placeholder=" " /><label
          class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-[#8D75F5] before:border-blue-gray-200 peer-focus:before:!border-[#8D75F5] after:border-blue-gray-200  peer-focus:after:!border-[#8D75F5]">
        Password
      </label>
    </div>
    <div className='mx-10'>
 


        <button onClick={handelSubmit} className='btn bg-[#8D75F5] w-full px-10 rounded-xl mt-3 h-10 text-white hover:bg-purple-700'>Login</button>

    </div>



  </div>


</div>


</div>

    </div>
  
  )
}

export default Login