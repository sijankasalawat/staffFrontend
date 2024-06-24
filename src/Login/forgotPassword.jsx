import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, UserIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify';
import { forgotPasswordApi } from '../Apis/Api';

export default function ForgetPassword() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("");

  const cancelButtonRef = useRef(null)
  const handleForgotClick = () => {
    console.log("forgot password clicked!");
    setOpen(true);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const forgotPassword = (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };
    // Rename the inner function to something else
    forgotPasswordApi(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || "Internal server error");
      });
  };
  
  return (
    <>
    <h2 onClick={handleForgotClick} className="text-orange-500 text-end mt-3 ">Forgot Password ?</h2>
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div >
                  
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <div className='flex gap-1 lg:gap-2 md:gap-1 items-center'>
                    <div className=" flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 mx-0 sm:mx-0 sm:h-10 sm:w-10">
                      <UserIcon className="h-6 w-6 text-sky-600" aria-hidden="true" />
                    </div>
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                       Enter Your Email
                      </Dialog.Title>
                      </div>
                      <div className="mt-2 w-90">
                       
                     
                        <input 
              placeholder="enter you email"  onChange={handleEmail} type="text" className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 mb-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-green-400 px-3 py-2 text-sm font-semibold text-white shadow-sm   hover:bg-green-500 sm:mt-0 sm:w-auto"
                    onClick={forgotPassword}
                    ref={cancelButtonRef}
                  >
                   Change Password
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  )
}
