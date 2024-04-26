import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import Dashboard from "./AdminDashboard/Dashboard";
import Attendence from "./AdminDashboard/Attendence";
import AllEmployees from "./AdminDashboard/AllEmployees";
import Login from "./Login/Login";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login/>} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/all-employees" component={AllEmployees} />
        <Route path="/attendance" component={Attendence} />
      </Routes>
    </Router>
  );
}

export default App;
