import React, { useContext, useEffect, useState } from 'react'
import NavbarContainer from '../../Components/Doctor/NavbarContainer'
import image from '../../assets/avatar.png'
import { useDoctor } from '../../context/DoctorContext.jsx'

const Profile = () => {

  const {userData} = useDoctor();
  const [doctor, setDoctor] = useState(userData.user);
  console.log(userData);


  return (
    <div>
      <div><NavbarContainer/></div>
      <div className='d-flex'>
        <div className="col-sm-5 p-1 pt-5 d-flex flex-column gap-4 align-items-center">
          <img src={image} width="300px" height="300px" className='rounded-circle'/>
          <div><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i></div>
          <button className='bg-success'>Update Profile</button>
          <button className='bg-dark text-white'>Remove Account</button>
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
            <p>{doctor.date_of_birth}</p> {/*displays wrong dob */}
          </div>
          <div className="row">
            <h6>Password</h6>
            <p>{'*'.repeat(doctor.password)}</p> {/*displays stars for length of password */}
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
            <p>{`${doctor.longitude},${doctor.latitude}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile