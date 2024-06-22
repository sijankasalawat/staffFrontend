import React, { useEffect, useState } from 'react';
import { getAllRequestsApi, updateRequestsApi } from '../Apis/Api';

const AttendanceRequest = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const { data } = await getAllRequestsApi();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
        setError('Error fetching leave requests');
      }
    };

    fetchLeaveRequests();
  }, []);

  const openImageModal = (fileUrl) => {
    console.log('Opening file:', fileUrl);
    if (fileUrl && fileUrl.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
      window.open(fileUrl, '_blank');
    } else {
      console.error('Invalid file URL:', fileUrl);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    setLoading(true); // Set loading state to true when update starts
    try {
      const updatedTicket = await updateRequestsApi(id, { status: newStatus });
      // Update the status in the local tickets state
      const updatedTickets = tickets.map(ticket =>
        ticket._id === id ? { ...ticket, status: updatedTicket.status } : ticket
      );
      setTickets(updatedTickets);
    } catch (error) {
      console.error('Error updating leave request:', error);
      setError('Error updating leave request');
    } finally {
      setLoading(false); // Set loading state to false when update completes
    }
  };

  return (
    <>
     <div className="p-4">
     <div className=" pt-10 mt-3">
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
                    {ticket.user}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {ticket.title}
                  </td>
                  <td className="px-6 py-4">{ticket.reason}</td>
                  <td className="px-6 py-4 text-green-500">{ticket.fromDate}</td>
                  <td className="px-6 py-4 text-red-500">{ticket.toDate}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openImageModal(ticket.fileUrl)}
                      className="text-blue-500"
                    >
                      View File
                    </button>
                  </td>
                  <td className="px-6 py-4">{ticket.status}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleUpdateStatus(ticket._id, 'Approved')}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2"
                      disabled={loading} // Disable button while loading
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(ticket._id, 'Rejected')}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                      disabled={loading} // Disable button while loading
                    >
                      Reject
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
    </>
  );
};

export default AttendanceRequest;
