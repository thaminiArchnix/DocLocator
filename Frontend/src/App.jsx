import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./Pages/Doctor/Register";
import Dashboard from "./Pages/Doctor/Dashboard";
import Appointments from "./Pages/Doctor/Appointments";
import History from "./Pages/Doctor/History";
import Profile from "./Pages/Doctor/Profile";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/doctor/register" element={<Register/>} />
          <Route path="/doctor/dashboard" element={<Dashboard/>} />
          <Route path="/doctor/appointments" element={<Appointments/>} />
          <Route path="/doctor/history" element={<History/>} />
          <Route path="/doctor/profile" element={<Profile/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;