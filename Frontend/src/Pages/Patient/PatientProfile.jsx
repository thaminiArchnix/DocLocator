import React, { useContext, useEffect, useState } from 'react'
import NavbarContainer from '../../Components/Doctor/NavbarContainer'
import image from '../../assets/avatar.png'
import { usePatient } from '../../context/Patient/patientContext.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Map from '../../Components/Patient/LocationMap.jsx'
import PatientNavbarContainer from '../../Components/Patient/PatientNavbarContainer.jsx'


const PatientProfile = () => {

  const {userData, logout} = usePatient();
  const [patient, setPatient] = useState(userData.user);
  const [deleteMsg, setDeleteMsg] = useState(false);
  const navigate = useNavigate();
  
  console.log(patient);


  const handleRemove = () => {
    try {
      setDeleteMsg(true);
      
    } catch (error) {
      
    }
  };
  const deleteNow = async () => {
    try {
      
      const response = await axios.delete(`http://localhost:3000/patient/removePatient/${userData.user.id}`);
      logout();
      navigate('../patient/regi');
      
      
    } catch (error) {
      
    }
  }

  return (
    <div>
      <div><PatientNavbarContainer/></div>
      <div className='d-flex'>
        <div className="col-sm-5 p-1 pt-5 d-flex flex-column gap-4 align-items-center">
          <img src={image} width="300px" height="300px" className='rounded-circle'/>
          <button className='bg-success'>Update Profile</button>
          <button className='bg-dark text-white' onClick={handleRemove}>Remove Account</button>
        </div>
        {/* <div className={deleteMsg ? 'custom-alert rounded d-flex flex-column gap-2 justify-content-center align-items-center' : 'hidden'} >
          Delete Now
          <button className='btn btn-dark' onClick={deleteNow}>Delete</button>
          <button className='btn btn-danger' onClick={() => (setDeleteMsg(false))}>No!</button>
        </div> */}

        <div className="col-sm-6 d-flex flex-column gap-2 py-5">
          <div className="row">
            <h6>Name</h6>
            <p>{patient[0].Name}</p>

          </div>
          <div className="row">
            <h6>Email</h6>
            <p>{patient[0].Email}</p>
          </div>
          <div className="row">
            <h6>Date of Birth</h6>
            <p>{patient[0].DOB}</p>
          </div>
          <div className="row">
            <h6>Password</h6>
            <p>{'*'.repeat(patient.Password)}</p>
          </div>
          <div className="row">
            <h6>Phone</h6>
            <p>{patient[0].Phone}</p>
          </div>
          <div className="row">
            <h6>Location</h6>
            <Map longitude={parseFloat(userData.user.longitude)} latitude={parseFloat(userData.user.latitude)}/>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default PatientProfile