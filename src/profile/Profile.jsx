import React from 'react'
import profile from "../assets/images/logo.png"
import bg from "../assets/images/bg.png"


const Profile = () => {
  return (
    <>
    <div className='bg-cover bg-center h-screen'    style={{ backgroundImage: `url(${bg})` }}
 >

<div className='p-4 pt-5'>

    
<div className='pt-10 mt-3'>
      <div className='lg:mt-[40px] mt-[20px]'>
        <div className='grid lg:grid-cols-3 grid-cols-1 gap-4'>
          <div className=' border shadow-md rounded-md bg-white'>
            <div className='flex justify-center mt-5'>
              <img src={profile} alt="profile" className='h-[200px]' />

            </div>
            <div className='mt-2 text-3xl text-gray-600 font-bold text-center'>
              Sijan Kasalawat
            </div>
            <div className='p-3 px-5'>
              <div className='flex gap-2 p-2 pt-4'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" class="size-6">
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
                <div>sijankasalawat@gmail.com</div>
              </div>
              <div className='flex gap-2 p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" class="size-6">
                  <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                </svg>

                <div>bhaktapur</div>
              </div>
              <div className='flex gap-2 p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" class="size-6">
                  <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd" />
                </svg>


                <div>9876543212</div>
              </div>
            </div>


          </div>
          <div className='col-span-2'>
            <div className='p-4 bg-white shadow-md rounded-md'>
            <div className='text-[#F97316] font-bold text-3xl'>Profile Setting</div>
            <div className='text-gray-600'>Update Your Profile</div>
            <div className='grid lg:grid-cols-2'>
              

            </div>
              </div>

          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    </>
  )
}

export default Profile