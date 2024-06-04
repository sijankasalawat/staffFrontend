import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllEventsApi } from '../Apis/Api';

const AllEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events when the component mounts
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await getAllEventsApi();
            if (res.data && res.data.events) {
                setEvents(res.data.events);
            } else {
                toast.error('Failed to fetch events');
            }
        } catch (err) {
            console.error('Error fetching events:', err);
            toast.error('Failed to fetch events');
        }
    };

    return (
        <>
            <div className='bg-[#F97316] font-bold text-center w-full text-xl text-white rounded-sm mt-3 mb-3'>Upcoming Events</div>
            {events.map((event) => (
                <div className='border rounded-md flex justify-between p-2 items-center mb-2 shadow-sm' key={event._id}>
                    <div>
                        <h1 className="text-[#F97316]"> {new Date(event.date).toLocaleDateString()}</h1> {/* Format date to display only date */}
                        <div className=' text-xl font-bold'> {event.name}</div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F97316" className="w-10 h-10 bg-orange-50 p-2 rounded">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                </div>
            ))}
        </>
    );
};

export default AllEvents;
