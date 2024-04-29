import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
const AdminRoutes = () => {
  // const admin = JSON.parse(localStorage.getItem("admin"));
  const admin = 'yes'
  // if (admin!==null){
  //     <Outlet />;
  // } else {
  //   // If user is not logged in, redirect to the login page
  //   return <Navigate to="/login" />;
  // }
  if (!admin) {
    return <Navigate to="/login" />;
  }
}
  export default AdminRoutes