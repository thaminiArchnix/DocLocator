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
import PatientMyAppointments from "./Pages/Patient/PatientMyAppointments";
import PatientProfile from "./Pages/Patient/PatientProfile";
import PatientLogin from "./Components/Patient/PatientLogin";
import PatientHistory from "./Pages/Patient/PatientHistory"
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './index.css';

import PatientNavbarContainer from "./Components/Patient/PatientNavbarContainer";
import PatientAppointmentCard from "./Components/Patient/PatientAppointmentCard";
import NearestDoctor from "./Components/Patient/NearestDoctor";
import { PatientContextProvider } from "./Context/Patient/patientContext";
import MakeAppointment from "./Pages/Patient/MakeAppointment";
import AuthPage from "./Pages/Patient/AuthPage";



function App() {
  return (
    
    <PatientContextProvider>
      <Router>
        <Routes>
          <Route path="/doctor/login" element={<Login/>} />
          <Route path="/doctor/register" element={<Register/>} />
          <Route path="/doctor/dashboard" element={<Dashboard/>} />
          <Route path="/doctor/appointments" element={<Appointments/>} />
          <Route path="/doctor/history" element={<History/>} />
          <Route path="/doctor/profile" element={<Profile/>} />
          
            <Route path="/patient/login" element={<PatientLogin />} />
            <Route path="/patient/regi" element={<PatientRegister />} />
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/myappointment" element={<PatientMyAppointments />} />
            <Route path="/patient/profile" element={<PatientProfile />} />
            <Route path="/patient/history" element={<PatientHistory />} />
            
            <Route path="/patient/patientAuth" element={<AuthPage />} />
  

          

          {/* <Route path="/patient/regi" element={<PatientRegister/>}/>
          <Route path="/patient/dashboard" element={<PatientDashboard/>}/>
          <Route path="/patient/myappointment" element={<PatientMyAppointments/>}/>
          <Route path="/patient/profile" element={<PatientProfile/>}/> */}



            <Route path="/appointment/MakeAppointment" element={<MakeAppointment />} />   


          

   





          

          {/* <Route path="/patient/nb" element={<PatientNavbarContainer/>}/>
          <Route path="/patient/ac" element={<PatientAppointmentCard/>}/>
          <Route path="/patient/nd" element={<NearestDoctor/>}/> */}


        </Routes>
      </Router>
    </PatientContextProvider>
    
  );
}

export default App;