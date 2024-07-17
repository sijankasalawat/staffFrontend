import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { getAllRequestsApi, updateRequestsApi, getUserByIdApi } from '../Apis/Api';
import ReactLoading from 'react-loading';

const AttendanceRequest = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [loadingId, setLoadingId] = useState(''); // State for tracking which button is loading
  const [error, setError] = useState('');
  const [usernames, setUsernames] = useState({}); // State for storing usernames
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const { data } = await getAllRequestsApi();
        setTickets(data);

        // Fetch usernames based on userIds
        const usernames = await fetchUsernames(data);
        setUsernames(usernames);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
        setError('Error fetching leave requests');
      }
    };

    fetchLeaveRequests();
  }, []);

  const fetchUsernames = async (tickets) => {
    const usernames = {};
    for (const ticket of tickets) {
      try {
        const response = await getUserByIdApi(ticket.user);
        usernames[ticket.user] = response.data.user.username;
      } catch (error) {
        console.error(`Error fetching username for userId ${ticket.user}:`, error);
      }
    }
    return usernames;
  };

  const openImageModal = (fileUrl) => {
    setModalImageUrl(fileUrl);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (id, newStatus) => {
    setLoading(true); // Set loading state to true when update starts
    setLoadingId(id); // Set the loading ID to the current ticket's ID
    try {
      const response = await updateRequestsApi(id, { status: newStatus });
      console.log('Updated response:', response);
      
      // Update the status in the local tickets state
      const updatedTickets = tickets.map(ticket =>
        ticket._id === id ? { ...ticket, status: response.data.status } : ticket
      );
      setTickets(updatedTickets);
    } catch (error) {
      console.error('Error updating leave request:', error);
      setError('Error updating leave request');
    } finally {
      setLoading(false); // Set loading state to false when update completes
      setLoadingId(''); // Reset the loading ID
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="pt-10 mt-3">
          <div className='text-[#F97316] font-bold text-3xl'>Attendance Request</div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded-xl mt-3">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    S.N.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User Name
                  </th>
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
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(tickets) && tickets.length > 0 ? (
                  tickets.map((ticket, index) => (
                    <tr
                      key={ticket._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-4 py-4">{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {usernames[ticket.user] || 'Loading...'}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ticket.title}
                      </td>
                      <td className="px-6 py-4">{ticket.reason}</td>
                      <td className="px-6 py-4 text-green-500">{ticket.fromDate}</td>
                      <td className="px-6 py-4 text-red-500">{ticket.toDate}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openImageModal(ticket.file)}
                          className="text-blue-500"
                        >
                          View File
                        </button>
                      </td>
                      <td className="px-6 py-4">{ticket.status}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleUpdateStatus(ticket._id, 'Approved')}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2 flex items-center justify-center"
                          disabled={loading && loadingId === ticket._id} // Disable button while loading
                        >
                          {loading && loadingId === ticket._id ? (
                            <ReactLoading type="spin" color="#ffffff" height={'20px'} width={'20px'} />
                          ) : (
                            'Approve'
                          )}
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(ticket._id, 'Rejected')}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center justify-center"
                          disabled={loading && loadingId === ticket._id} // Disable button while loading
                        >
                          {loading && loadingId === ticket._id ? (
                            <ReactLoading type="spin" color="#ffffff" height={'20px'} width={'20px'} />
                          ) : (
                            'Reject'
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 text-center">
                      {error ? (
                        <div className="text-red-600">{error}</div>
                      ) : (
                        'No leave requests found'
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    File Image
                  </Dialog.Title>
                  <div className="mt-2">
                    {modalImageUrl ? (
                      <img src={modalImageUrl} alt="File" className="w-[400px] h-auto" />
                    ) : (
                      <p className="text-sm text-gray-500">No image available.</p>
                    )}
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AttendanceRequest;
