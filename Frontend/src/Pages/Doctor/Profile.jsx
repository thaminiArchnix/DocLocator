import React from 'react'
import NavbarContainer from '../../Components/Doctor/NavbarContainer'
import image from '../../assets/avatar.png'

const Profile = () => {
  return (
    <div>
      <div><NavbarContainer/></div>
      <div className='d-flex'>
        <div className="col-sm-5 p-1 pt-5 d-flex flex-column gap-4 align-items-center">
          <img src={image} width="300px" height="300px" className='rounded-circle'/>
          <div><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star"></i></div>
          <button className='bg-success'>Update Profile</button>
          <button className='bg-dark text-white'>Remove Account</button>
        </div>
        <div className="col-sm-6 d-flex flex-column gap-2 py-5">
          <div className="row">
            <h6>Name</h6>
            <p>Nirwan Ranasinghe</p>
          </div>
          <div className="row">
            <h6>Email</h6>
            <p>nirwan@company.com</p>
          </div>
          <div className="row">
            <h6>Date of Birth</h6>
            <p>20 February, 1980</p>
          </div>
          <div className="row">
            <h6>Password</h6>
            <p>xxxxxxxxxx</p>
          </div>
          <div className="row">
            <h6>Phone</h6>
            <p>0715678900</p>
          </div>
          <div className="row">
            <h6>Specialization</h6>
            <p>Cardiologist</p>
          </div>
          <div className="row">
            <h6>Gender</h6>
            <p>Male</p>
          </div>
          <div className="row">
            <h6>Location</h6>
            <p>123, Union Place, Colombo</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile