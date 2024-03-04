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
import Login from "./Pages/Doctor/Login";

import PatientRegister from "./Pages/Patient/PatientRegister";
import PatientDashboard from "./Pages/Patient/PatientDashboard";

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './index.css';

import PatientNavbarContainer from "./Components/Patient/PatientNavbarContainer";
import PatientAppointmentCard from "./Components/Patient/PatientAppointmentCard";
function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/doctor/login" element={<Login/>} />
          <Route path="/doctor/register" element={<Register/>} />
          <Route path="/doctor/dashboard" element={<Dashboard/>} />
          <Route path="/doctor/appointments" element={<Appointments/>} />
          <Route path="/doctor/history" element={<History/>} />
          <Route path="/doctor/profile" element={<Profile/>} />

          <Route path="/patient/regi" element={<PatientRegister/>}/>
          <Route path="/patient/dashboard" element={<PatientDashboard/>}/>


          

          <Route path="/patient/nb" element={<PatientNavbarContainer/>}/>
          <Route path="/patient/ac" element={<PatientAppointmentCard/>}/>


        </Routes>
      </Router>
    </>
  );
}

export default App;