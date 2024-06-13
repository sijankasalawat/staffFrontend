import React from 'react';

const UserDetailModal = ({ user, open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/2 relative">
        <button className="absolute top-0 right-0 mt-4 mr-4" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        <div className="mb-2"><strong>Name:</strong> {user.fName} {user.lName}</div>
        <div className="mb-2"><strong>Email:</strong> {user.email}</div>
        <div className="mb-2"><strong>Designation:</strong> {user.designation}</div>
        <div className="mb-2"><strong>Role:</strong> {user.role}</div>
        <div className="mb-2"><strong>Phone:</strong> {user.phoneNumber}</div>
        <div className="mb-2"><strong>Address:</strong> {user.address}</div>
      </div>
    </div>
  );
};

export default UserDetailModal;
