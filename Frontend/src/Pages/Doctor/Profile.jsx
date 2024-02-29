import React, { useContext, useEffect, useState } from 'react'
import NavbarContainer from '../../Components/Doctor/NavbarContainer'
import image from '../../assets/avatar.png'
import { useDoctor } from '../../context/DoctorContext.jsx'

const Profile = () => {

  const {userData} = useDoctor();
  const [doctor, setDoctor] = useState(userData);

  useEffect(() => {
    const storedUserData = getCookie('UserDoctor');
    console.log(storedUserData);
    if (storedUserData) {
      setDoctor(JSON.parse(storedUserData));
    }
  }, []);
  


  // Function to set a cookie
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  // Function to get a cookie
  const getCookie = (name) => {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1, cookie.length);
      }
    }
    return null;
  }

  // Set the cookie when the userData changes
  useEffect(() => {
    if (userData) {
      setCookie('UserDoctor', JSON.stringify(userData), 30); // Expires in 30 days
    }
  }, [userData]);

  const storedUserData = getCookie('UserDoctor');
  console.log(JSON.parse(storedUserData));

  useEffect(() => {
    const storedUserData = getCookie('UserDoctor');
    console.log(storedUserData);
    if (storedUserData) {
      setDoctor(JSON.parse(storedUserData));
      console.log('HIIII')
    }
  }, []);

  setDoctor(JSON.parse(getCookie('UserDoctor')));
  console.log(doctor);

  return (
    <div>
      <div><NavbarContainer/></div>
      <div className='d-flex'>
        <div className="col-sm-5 p-1 pt-5 d-flex flex-column gap-4 align-items-center">
          <img src={image} width="300px" height="300px" className='rounded-circle'/>
          <div><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i class="bi bi-star"></i></div>
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
            <p>{doctor.password}</p> {/*displays non-hashed password */}
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