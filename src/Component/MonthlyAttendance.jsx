import React, { useEffect , useState} from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { getUserAttendanceApi } from '../Apis/Api';
import dayjs from 'dayjs'
var isBetween = require("dayjs/plugin/isBetween");

dayjs.extend(isBetween)


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MonthlyAttendance = ({userId}) => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [data,setData] = useState( {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Present',
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 1,
        hoverBackgroundColor: '#36A2EB',
        hoverBorderColor: '#36A2EB',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        label: 'Absent',
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
        borderWidth: 1,
        hoverBackgroundColor: '#FF6384',
        hoverBorderColor: '#FF6384',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  })

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        type: 'category',
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };


  useEffect(() => {
    if(userId){
      fetchUserAttendance();
    }
  },[userId])

  
useEffect(() => {
  if (attendanceData) {
    const months = Array.from({ length: 12 }).map((_, i) => {
      const startOfMonth = dayjs().month(i).startOf('month');
      const endOfMonth = dayjs().month(i).endOf('month');
      return { startOfMonth, endOfMonth };
    });

    const presentData = Array.from({ length: 12 }).map(() => 0);
    const absentData = Array.from({ length: 12 }).map(() => 0);

    for (let i = 0; i < attendanceData.length; i++) {
      const attendance = attendanceData[i];
      const date = dayjs(attendance.timestamp);

      months.forEach((month, index) => {
        if (date.isBetween(month.startOfMonth, month.endOfMonth, 'day', '[]')) {
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

    setData((prev) => {
      return {
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: presentData,
          },
          {
            ...prev.datasets[1],
            data: absentData,
          },
        ],
      };
    });

    console.log({ data });
  }
}, [attendanceData]);

  const fetchUserAttendance = async () => {

    try{
      const {data} = await getUserAttendanceApi(userId);
      setAttendanceData(data?.attendances);
    }catch(error){
      console.log('error: ', error);
    }
    
  }

  return (
    <div className='border rounded-xl p-5'>
     
      <div className='text-xl mb-4'>Monthly Attendance</div>
      <Bar data={data} options={options} />
     
    </div>
  );
};

export default MonthlyAttendance;
