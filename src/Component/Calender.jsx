import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import "./calender.css";
export default function BasicDateCalendar() {
  const isCurrentDate = (date) => dayjs(date).isSame(dayjs(), 'day');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar style={{width:"100%"}}
        components={{
          day: ({ day, date }) => {
            const style = {
              backgroundColor: isCurrentDate(date) ? '#8D75F5' : undefined,
              color: isCurrentDate(date) || date.day() === 6 ? 'red' : undefined,
            };
            return (
              <div style={style}>
                {day}
              </div>
            );
          },
        }}
      />
    </LocalizationProvider>
  );
}
