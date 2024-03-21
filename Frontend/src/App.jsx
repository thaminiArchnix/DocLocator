import React, { useState, useMemo, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { PatientContextProvider } from "./context/Patient/patientContext.jsx";
import {DoctorContextProvider } from "./context/DoctorContext.jsx";
import Register from "./Pages/Doctor/Register";
import Dashboard from "./Pages/Doctor/Dashboard";
import Appointments from "./Pages/Doctor/Appointments";
import History from "./Pages/Doctor/History";
import Profile from "./Pages/Doctor/Profile";
import Login from "./Pages/Doctor/Login";
import PatientLogin from "./Pages/Patient/PatientLogin.jsx";
import PatientRegister from "./Pages/Patient/PatientRegister.jsx";
import PatientDashboard from "./Pages/Patient/PatientDashboard.jsx";
import PatientMyAppointments from "./Pages/Patient/PatientMyAppointments.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './index.css';
import Auth from "./Pages/Doctor/Auth.jsx";
import Update from "./Pages/Doctor/Update.jsx";
import HomePage from "./Pages/HomePage.jsx";
import PatientProfile from "./Pages/Patient/PatientProfile.jsx";
import PatientHistroy from "./Pages/Patient/PatientHistory.jsx";
import AuthPage from "./Pages/Patient/AuthPage.jsx";
import MakeAppointment from "./Pages/Patient/MakeAppointment.jsx";
import UpdatePatient from "./Pages/Patient/UpdatePatient.jsx";


function App() {



  return (
    <>
    <DoctorContextProvider>
    <PatientContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<HomePage/>}/>
          <Route path="/doctor/login" element={<Login/>} />
          <Route path="/doctor/register" element={<Register/>} />
          <Route path="/doctor/dashboard" element={<Dashboard/>} />
          <Route path="/doctor/appointments" element={<Appointments/>} />
          <Route path="/doctor/history" element={<History/>} />
          <Route path="/doctor/profile" element={<Profile/>} />
          <Route path="/doctor/auth" element={<Auth/>}/>
          <Route path="/doctor/update" element={<Update/>}/>

          <Route path="/patient/login" element={<PatientLogin/>}/>
          <Route path="/patient/regi" element={<PatientRegister/>}/>
          <Route path="/patient/dashboard" element={<PatientDashboard/>}/>
          <Route path="/patient/myappointment" element={<PatientMyAppointments/>}/>
          <Route path="/patient/profile" element={<PatientProfile/>}/>
          <Route path="/patient/history" element={<PatientHistroy/>}/>
          <Route path="/patient/patientAuth" element={<AuthPage/>}/>
          <Route path="/patient/updateProfile" element={<UpdatePatient/>}/>


          <Route path="/appointment/MakeAppointment" element={<MakeAppointment/>}/>
        </Routes>
      </Router>
      </PatientContextProvider>
    </DoctorContextProvider>
    

    
    {/* <DoctorContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<HomePage/>}/>
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
    <PatientContextProvider>
      <Router>
        <Routes>
          <Route path="/patient/login" element={<PatientLogin/>}/>
          <Route path="/patient/regi" element={<PatientRegister/>}/>
          <Route path="/patient/dashboard" element={<PatientDashboard/>}/>
          <Route path="/patient/myappointment" element={<PatientMyAppointments/>}/>
          <Route path="/patient/profile" element={<PatientProfile/>}/>
          <Route path="/patient/history" element={<PatientHistroy/>}/>
          <Route path="/patient/patientAuth" element={<AuthPage/>}/>

          <Route path="/appointment/MakeAppointment" element={<MakeAppointment/>}/>
        </Routes>
      </Router>
    </PatientContextProvider> */}
    </>
  );
}

export default App;