import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { getUserAttendanceApi } from '../Apis/Api';
import dayjs from 'dayjs';
var isBetween = require("dayjs/plugin/isBetween");

dayjs.extend(isBetween);

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AttendanceBar = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Present',
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 1,
        hoverBackgroundColor: '#36A2EB',
        hoverBorderColor: '#36A2EB',
        data: [], // Replace with actual data
      },
      {
        label: 'Absent',
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
        borderWidth: 1,
        hoverBackgroundColor: '#FF6384',
        hoverBorderColor: '#FF6384',
        data: [], // Replace with actual data
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
      fetchUserAttendance();
  }, []);

  useEffect(() => {
    if (attendanceData) {
      const next7Days = Array.from({ length: 7 }).map((_, i) => dayjs(selectedDate).add(i, 'day'));
      const labels = next7Days.map(date => date.format('dddd'));
      const presentData = Array.from({ length: 7 }).map(() => 0);
      const absentData = Array.from({ length: 7 }).map(() => 0);

      for (let i = 0; i < attendanceData.length; i++) {
        const attendance = attendanceData[i];
        const date = dayjs(attendance.timestamp);

        next7Days.forEach((day, index) => {
          if (date.isSame(day, 'day')) {
            if (attendance.status === 'Present') {
              presentData[index] += 1;
            } else {
              absentData[index] += 1;
            }
          }
        });
      }

      console.log('absentData: ', absentData);
      console.log('presentData: ', presentData);

      setData({
        labels,
        datasets: [
          {
            ...data.datasets[0],
            data: presentData,
          },
          {
            ...data.datasets[1],
            data: absentData,
          },
        ],
      });

      console.log({ data });
    }
  }, [attendanceData, selectedDate]);

  const fetchUserAttendance = async () => {
    try {
      const { data } = await getUserAttendanceApi();
      setAttendanceData(data?.attendances);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div className='border rounded-xl p-5'>
      <div className='flex gap-2 justify-between'>
      <div className='text-2xl font-bold mb-4'>Weekly Attendance</div>

        <div>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              datepicker
              onChange={(e) => setSelectedDate(dayjs(e.target.value).format('YYYY-MM-DD'))}
              id="default-datepicker"
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
            />
          </div>
        </div>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default AttendanceBar;
