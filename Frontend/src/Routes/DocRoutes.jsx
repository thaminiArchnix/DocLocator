import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../Pages/Doctor/Login'
import Register from '../Pages/Doctor/Register'
import Dashboard from '../Pages/Doctor/Dashboard'
import Appointments from '../Pages/Doctor/Appointments'
import History from '../Pages/Doctor/History'
import Profile from '../Pages/Doctor/Profile'
import Auth from '../Pages/Doctor/Auth'
import { DoctorContextProvider } from '../context/DoctorContext'

const DocRoutes = () => {
  return (
    <React.Fragment>
    

            <Route path="/doctor/login" element={<Login/>} />
            <Route path="/doctor/register" element={<Register/>} />
            <Route path="/doctor/dashboard" element={<Dashboard/>} />
            <Route path="/doctor/appointments" element={<Appointments/>} />
            <Route path="/doctor/history" element={<History/>} />
            <Route path="/doctor/profile" element={<Profile/>} />
            <Route path="/doctor/auth" element={<Auth/>}/>
            <Route path="/doctor/update" element={<Update/>}/>
    </React.Fragment>  
   
  )
}

export default DocRoutes
