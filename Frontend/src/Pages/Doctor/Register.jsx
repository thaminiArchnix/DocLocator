import React from 'react'
import {Link} from 'react-router-dom'

const Register = () => {
  return (
    <div className='container d-flex flex-column align-items-center justify-content-center py-5'>
        <h2>Sign Up as a Doctor</h2>
        <form className='d-flex flex-column w-50 gap-2 '>
            <label>Full Name</label>
            <input type="text" placeholder='Enter your Full Name' className="form-control"></input>
            <label>Email</label>
            <input type="email" placeholder='Enter your email' className="form-control"></input>
            <label>Phone Number</label>
            <input type="tel" placeholder='Enter your phone number' className="form-control"></input>
            <label>Gender</label>
            <select className="form-control">
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
            <label>Date of Birth</label>
            <input type="date" placeholder='Enter your Date of Birth' className="form-control"></input>
            <label>Specialization</label>
            <input type="text" placeholder='Enter your Specialization' className="form-control"></input>
            <label>Location</label>
            <input type="text" placeholder='Enter your Permanent Location' className="form-control"></input>
            <label>Password</label>
            <input type="password" placeholder='Enter your password' className="form-control"></input>
            <label>Confirm Password</label>
            <input type="password" placeholder='Confirm your password' className="form-control"></input>
            <button>Sign Up</button>
        </form>
        <p className='py-2'>Already a Member? <Link to='../doctor/login'>Login</Link></p>
        
    </div>
  )
}

export default Register