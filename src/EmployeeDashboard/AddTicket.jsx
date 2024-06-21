import { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ShieldExclamationIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { createTicketApi, getTicketsByUserIdApi } from '../Apis/Api';

const AddTicket = () => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [title, setTitle] = useState('');
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageModalSrc, setImageModalSrc] = useState(null);

  const userId = JSON.parse(localStorage.getItem('user'))._id;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await getTicketsByUserIdApi(userId);
        if (res.data.success && Array.isArray(res.data.leaveRequests)) {
          setTickets(res.data.leaveRequests);
        } else {
          console.error('API response does not contain an array:', res.data);
          toast.error('An error occurred while fetching tickets.');
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
        toast.error('An error occurred while fetching tickets.');
      }
    };

    fetchTickets();
  }, [userId]);

  const handleImage = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !reason || !startDate || !endDate || !productImage) {
      setError('Please fill all the fields including the file');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('title', title);
    formData.append('reason', reason);
    formData.append('fromDate', startDate);
    formData.append('toDate', endDate);
    formData.append('file', productImage);

    try {
      const res = await createTicketApi(formData, userId);
      if (res.data && res.data.success) {
        setOpen(false);
        setTitle('');
        setReason('');
        setStartDate('');
        setEndDate('');
        setProductImage(null);
        setPreviewImage(null);
        toast.success(res.data.message);
        setTickets((prevTickets) => [ res.data.leaveRequest, ...prevTickets,]);
      } else {
        setError(res.data.message || 'Failed to create leave request');
        toast.error(res.data.message || 'Failed to create leave request');
      }
    } catch (error) {
      console.error('API error:', error);
      toast.error('An error occurred while creating the leave request.');
    }
  };

  const openImageModal = (src) => {
    setImageModalSrc(src);
    setImageModalOpen(true);
  };

  return (
    <>
      <div>
        <div className='text-[#F97316] font-bold text-3xl'>Add Leave Request</div>
        <div className='text-gray-600'>Add Your Leave Requests</div>

        <button
          className='btn p-2 px-4 bg-[#F97316] text-white rounded-md font-bold hover:bg-orange-400'
          onClick={() => setOpen(true)}
        >
          Add Ticket
        </button>

        <Transition.Root show={open} as={Fragment}>
          <Dialog className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ShieldExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Leave Request
                          </Dialog.Title>
                        </div>
                      </div>
                      <div className="mt-2">
                        <form onSubmit={handleSubmit}>
                          <label>Title</label>
                          <input
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            type="text"
                            name="title"
                            id="title"
                            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                            placeholder="Enter title"
                          />
                          <label className="mt-3">Reason</label>
                          <input
                            onChange={(e) => setReason(e.target.value)}
                            value={reason}
                            type="text"
                            name="reason"
                            id="reason"
                            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                            placeholder="Enter reason"
                          />
                          <label className="mt-3">Start Date</label>
                          <input
                            onChange={(e) => setStartDate(e.target.value)}
                            value={startDate}
                            type="date"
                            name="startDate"
                            id="startDate"
                            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                          />
                          <label className="mt-3">End Date</label>
                          <input
                            onChange={(e) => setEndDate(e.target.value)}
                            value={endDate}
                            type="date"
                            name="endDate"
                            id="endDate"
                            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                          />
                          <input
                            type="file"
                            onChange={handleImage}
                            className="mt-3 block w-full text-gray-500 font-medium text-sm bg-gray-100 border-0 py-2 px-4 rounded cursor-pointer bg-gray-800 hover:bg-gray-700 text-white"
                          />
                          {(previewImage || productImage) && (
                            <img
                              src={previewImage || URL.createObjectURL(productImage)}
                              alt="Preview"
                              className="mt-3 w-full rounded-md"
                            />
                          )}
                          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:w-auto"
                              onClick={() => setOpen(false)}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="inline-flex justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-300 sm:ml-3 sm:w-auto"
                            >
                              Add
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded-xl mt-3">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Reason
              </th>
              <th scope="col" className="px-6 py-3">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3">
                End Date
              </th>
              <th scope="col" className="px-6 py-3">
                File
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tickets) && tickets.length > 0 && tickets.map((ticket) => (
              <tr
                key={ticket._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {ticket.title}
                  {/* {{...ticket}} */}
                </td>
                <td className="px-6 py-4">{ticket.reason}</td>
                <td className="px-6 py-4">{ticket.fromDate}</td>
                <td className="px-6 py-4">{ticket.toDate}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openImageModal(ticket.fileUrl)}
                    className="text-blue-500"
                  >
                    View File
                  </button>
                </td>
                <td className="px-6 py-4">{ticket.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {imageModalOpen && (
        <Transition.Root show={imageModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setImageModalOpen}>
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

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            Image Preview
                          </Dialog.Title>
                          <div className="mt-2">
                            <img src={imageModalSrc} alt="Preview" className="w-full h-full object-cover rounded-md" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setImageModalOpen(false)}
                      >
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
};

export default AddTicket;
