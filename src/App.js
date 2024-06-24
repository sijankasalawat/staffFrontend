import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import Dashboard from "./AdminDashboard/Dashboard";
import Attendence from "./AdminDashboard/Attendence";
import AllEmployees from "./AdminDashboard/AllEmployees";
import Login from "./Login/Login";
import { ToastContainer } from "react-toastify";
import AdminRoutes from "./AdminProtected/AdminRoutes";
import 'react-toastify/dist/ReactToastify.css';
import HrDashboard from "./HrDashboard/HrDashboard";
import EmployeeDashboard from "./EmployeeDashboard/EmployeeDashboard";
import Error404 from "./Component/Error404";


function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
/>
      {/* Same as */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<AdminRoutes/>}>
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/employeedashboard" element={<EmployeeDashboard />} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/all-employees" component={AllEmployees} />
          <Route path="/attendance" component={Attendence} />
        </Route>
        <Route path="/hrdashboard" element={<HrDashboard />} />

        <Route path="*" element={<Error404/>} />


      </Routes>
    </Router>
  );
}

export default App;
