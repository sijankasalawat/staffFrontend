import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BriefcaseIcon } from '@heroicons/react/20/solid';
import Select from 'react-select';
import { createProjectApi, getAllUsersApi } from '../Apis/Api';
import { toast } from 'react-toastify';
import ProjectList from '../Component/ProjectList';

const AddProject = () => {
  const [open, setOpen] = useState(false);
  const [projectname, setProjectname] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [team, setTeam] = useState([]);

  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsersApi();
        setUsers(response.data.users.map(user => ({ value: user.username, label: user.username })));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleProjectname = (e) => {
    setProjectname(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleDeadline = (e) => {
    setDeadline(e.target.value);
  };

  const handleTeam = (selectedOptions) => {
    setTeam(selectedOptions.map(option => option.value));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectname || !description || !deadline || !team.length ) {
      setError('Please fill all the fields');
      return;
    }

    setError('');

    const data = {
      projectname,
      description,
      deadline,
      team,
   
    };

    try {
      const res = await createProjectApi(data);
      console.log('API response:', res);
      if (res.data && res.data.message) {
        setOpen(false);
        setProjectname('');
        setDescription('');
        setDeadline('');
        setTeam([]);
    
        toast.success(res.data.message);
      } else {
        setError('Unexpected response from the server');
        toast.error('Unexpected response from the server');
      }
    } catch (err) {
      console.error('Error creating project:', err);
      setError('Error creating project');
      toast.error('Error creating project');
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="pt-10 mt-3">
          <div className='text-[#F97316] font-bold text-3xl'>Add Project</div>
          <div className='text-gray-600'>Add New Project</div>
          <button className='bg-[#F97316] px-3 p-2 text-white rounded-md mt-3 font-bold' onClick={() => setOpen(true)}>Add Project</button>
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
                            <BriefcaseIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                          </div>
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                              Add Project
                            </Dialog.Title>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 pb-2">Add New Project</p>
                          <input
                            onChange={handleProjectname}
                            value={projectname}
                            type="text"
                            name="projectname"
                            id="projectname"
                            className="block w-[100%] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                            placeholder="Project Name"
                          />
                          <textarea
                            onChange={handleDescription}
                            value={description}
                            name="description"
                            id="description"
                            className="mt-3 block w-[100%] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                            placeholder="Description"
                          />
                          <input
                            onChange={handleDeadline}
                            value={deadline}
                            type="date"
                            name="deadline"
                            id="deadline"
                            className="mt-3 block w-[100%] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                          />
                          <Select
                            isMulti
                            name="team"
                            options={users}
                            className="mt-3 basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleTeam}
                            value={users.filter(user => team.includes(user.value))}
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

          <div className='all-projects'>
        <ProjectList/>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProject;
