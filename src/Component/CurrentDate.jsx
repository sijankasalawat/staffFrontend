import React, { useState, useEffect } from 'react';

function CurrentDate() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <h1 className='font-bold '>Today Date: {date.toDateString()}</h1>
    </div>
  );
}

export default CurrentDate;