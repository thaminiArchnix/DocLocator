import React, { useContext, useEffect, useState } from 'react'
import NavbarContainer from '../../Components/Doctor/NavbarContainer'
import mdoc from '../../assets/mdoc.png'
import fdoc from '../../assets/fdoc.png'
import { useDoctor } from '../../context/DoctorContext.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Map from '../../Components/Doctor/Map.jsx'
import { dateConverter } from '../../Middleware/dateConverter.js'


const Profile = () => {

  const {userData, logout} = useDoctor();
  const [doctor, setDoctor] = useState(userData.user); //Update functionality moved
  const [deleteMsg, setDeleteMsg] = useState(false);
  const navigate = useNavigate();
  const handleUpdate = () => {
    navigate('../doctor/update');
  }
  

  const handleRemove = () => {
    try {
      setDeleteMsg(true);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNow = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/doctor/${userData.user.id}`);
      logout();
      navigate('../doctor/register');
    } catch (error) {
      console.error(error);
    }
  }
  const dateOfBirth = dateConverter(doctor.date_of_birth);

  return (
    <div>
      <div><NavbarContainer/></div>
      <div className='d-flex'>
        <div className="col-sm-5 p-1 pt-5 d-flex flex-column gap-4 align-items-center">
          <img src={doctor.gender == "female" ? fdoc : mdoc} width="300px" height="300px" className='rounded-circle'/>
          <button className='bg-success' onClick={handleUpdate}>Update Profile</button>
          <button className='bg-dark text-white' onClick={handleRemove}>Remove Account</button>
        </div>
        <div className={deleteMsg ? 'custom-alert rounded d-flex flex-column gap-2 justify-content-center align-items-center' : 'hidden'} >
          Delete Now
          <button className='btn btn-dark' onClick={deleteNow}>Delete</button>
          <button className='btn btn-danger' onClick={() => (setDeleteMsg(false))}>No!</button>
        </div>

        <div className="col-sm-6 d-flex flex-column gap-2 py-5">
          <div className="row">
            <h6>Name</h6>
            <p>{doctor.full_name}</p>

          </div>
          <div className="row">
            <h6>Email</h6>
            <p>{doctor.email}</p>
          </div>
          <div className="row">
            <h6>Date of Birth</h6>
            <p>{dateOfBirth}</p> 
          </div>
          <div className="row">
            <h6>Password</h6>
            <p>{'*'.repeat(doctor.password)}</p>
          </div>
          <div className="row">
            <h6>Phone</h6>
            <p>{doctor.phone_number}</p>
          </div>
          <div className="row">
            <h6>Specialization</h6>
            <p>{doctor.specialization}</p>
          </div>
          <div className="row">
            <h6>Gender</h6>
            <p>{doctor.gender}</p>
          </div>
          <div className="row">
            <h6>Location</h6>
            <Map longitude={parseFloat(userData.user.longitude)} latitude={parseFloat(userData.user.latitude)} id={`doc${doctor.id}`}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile