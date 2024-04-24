
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from './Dashboard/AdminDashboard';


function App() {
  return (
<Router>
  <Routes>
  <Route path="/" element={<AdminDashboard />} />

  </Routes>
</Router>
  );
}

export default App;
