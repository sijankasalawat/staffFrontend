import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
  headers: {
    // "Content-Type": "multipart/form-data",
  },
});
const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

// Api.interceptors.request.use(
//   async (config) => {
//     console.log('config: ', config);
//       // const authStore = useAuthStore();
//       // const bearerToken = authStore.getToken();
//       // if (bearerToken) {
//         const bearerToken = localStorage.getItem('token')
//         if(bearerToken){

//           config.headers['Authorization'] = `Bearer ${bearerToken}`;
//         }
//       // }
//       return config;
//   },
//   (error) => {
//       return Promise.reject(error);
//   }
// );

export const loginApi = (data) => Api.post("api/user/adminLogin", data);
export const createUserApi = (data) => Api.post("api/user/createNewUser", data);
export const attendenceApi = (data) =>
  Api.post("api/user/employeeAttendance", data);
export const getUserByIdApi = (userId) =>
  Api.get(`api/user/getUserById/${userId}`);
export const getAllUsersApi = () => Api.get("api/user/getAllUsers");
export const markAttendanceApi = (data) =>
  Api.post("api/user/markAttendance", data);
export const updateAttendanceApi = (data) =>
  Api.post("api/user/updateAttendance", data);
export const attendanceRecordApi = (userId, data) =>
  Api.get(`/api/user/attendanceRecord/${userId}`, data);

export const createEventApi = (data) =>
  Api.post("api/user/createEvent", data);
export const getAllEventsApi = () => Api.get("api/user/getAllEvents");
export const deleteEventApi = (eventId) =>
  Api.delete(`api/user/deleteEvent/${eventId}`);
export const logoutUserApi =()=>Api.post("api/user/userLogout");
