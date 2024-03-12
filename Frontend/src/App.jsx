import React, { useState, useMemo, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import {DoctorContextProvider } from "./context/DoctorContext.jsx";
import Register from "./Pages/Doctor/Register";
import Dashboard from "./Pages/Doctor/Dashboard";
import Appointments from "./Pages/Doctor/Appointments";
import History from "./Pages/Doctor/History";
import Profile from "./Pages/Doctor/Profile";
import Login from "./Pages/Doctor/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './index.css';
import Auth from "./Pages/Doctor/Auth.jsx";
import Update from "./Pages/Doctor/Update.jsx";

function App() {



  return (
    <DoctorContextProvider>
      <Router>
        <Routes>
          <Route path="/doctor/login" element={<Login/>} />
          <Route path="/doctor/register" element={<Register/>} />
          <Route path="/doctor/dashboard" element={<Dashboard/>} />
          <Route path="/doctor/appointments" element={<Appointments/>} />
          <Route path="/doctor/history" element={<History/>} />
          <Route path="/doctor/profile" element={<Profile/>} />
          <Route path="/doctor/auth" element={<Auth/>}/>
          <Route path="/doctor/update" element={<Update/>}/>
        </Routes>
      </Router>
    </DoctorContextProvider>
  );
}

export default App;