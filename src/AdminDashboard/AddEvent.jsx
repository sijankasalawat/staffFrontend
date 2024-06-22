import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import { createEventApi } from '../Apis/Api';
import { toast } from 'react-toastify';
import EventList from './EventList';

const AddEvent = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleTime = (e) => {
    setTime(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !date || !time || !location) {
      setError('Please fill all the fields');
      return;
    }

    setError('');

    const data = {
      name,
      description,
      date,
      time,
      location,
    };

    try {
      const res = await createEventApi(data);
      console.log('API response:', res);
      if (res.data && res.data.message) {
        setOpen(false);
        setName('');
        setDescription('');
        setDate('');
        setTime('');
        setLocation('');
        toast.success(res.data.message);
      } else {
        setError('Unexpected response from the server');
        toast.error('Unexpected response from the server');
      }
    } catch (err) {
      console.error('Error creating event:', err);
      setError('Error creating event');
      toast.error('Error creating event');
    }
  };

  return (
    <>
     <div className="p-4">
     <div className=" pt-10 mt-3">
      <div className='text-[#F97316] font-bold text-3xl'>Add Event</div>
      <div className='text-gray-600'>Add Upcoming Events</div>
      <button className='bg-[#F97316] px-3 p-2 text-white rounded-md mt-3' onClick={() => setOpen(true)}>Add Event</button>
      <Transition show={open} as={Fragment}>
        <Dialog className="relative z-10" onClose={() => setOpen(false)}>
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
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <CalendarDaysIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Add Event
                        </Dialog.Title>
                      </div>
                    </div>
                    <div className="mt-2 ">
                      <p className="text-sm text-gray-500 pb-2">Add Upcoming Events</p>
                      <input
                        onChange={handleName}
                        value={name}
                        type="text"
                        name="title"
                        id="title"
                        className="block w-[100%] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                        placeholder="title"
                      />
                      <textarea
                        onChange={handleDescription}
                        value={description}
                        name="description"
                        id="description"
                        className="mt-3 block w-[100%] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                        placeholder="description"
                      />
                      <input
                        onChange={handleDate}
                        value={date}
                        type="date"
                        name="date"
                        id="date"
                        className="mt-3 block w-[100%] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        onChange={handleTime}
                        value={time}
                        type="time"
                        name="time"
                        id="time"
                        className="mt-3 block w-[100%] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        onChange={handleLocation}
                        value={location}
                        type="text"
                        name="location"
                        id="location"
                        className="mt-3 block w-[100%] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                        placeholder="location"
                      />
                    </div>
                  </div>
                  {error && <p className="text-red-500 text-sm ml-6">{error}</p>}
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      onClick={handleSubmit}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      data-autofocus
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className='all-event'>
      <EventList/>
      </div>
</div>
</div>
    </>
  );
};

export default AddEvent;
