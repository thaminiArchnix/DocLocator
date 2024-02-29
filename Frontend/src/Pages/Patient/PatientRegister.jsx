import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PatientRegister = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      fullName: e.target.Name.value,
      email: e.target.Email.value,
      phoneNumber: e.target.Phone.value,
      gender: e.target.Gender.value,
      dob: e.target.DOB.value,
      location: e.target.location.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value
    };

    try {
      const response = await axios.post('/api/patient/register', formData);

      // Handle success
      console.log('Registration successful:', response.data);

      // Redirect or show success message after successful registration
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className='container d-flex flex-column align-items-center justify-content-center py-5'>
      <h2>Sign Up as a Patient</h2>
      <form className='d-flex flex-column w-50 gap-2' onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" name="fullName" placeholder='Enter your Full Name' className="form-control" required />
        <label>Email</label>
        <input type="email" name="email" placeholder='Enter your email' className="form-control" required />
        <label>Phone Number</label>
        <input type="tel" name="phoneNumber" placeholder='Enter your phone number' className="form-control" required />
        <label>Gender</label>
        <select name="gender" className="form-control" required>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
        <label>Date of Birth</label>
        <input type="date" name="dob" placeholder='Enter your Date of Birth' className="form-control" required />
        <label>Location</label>
        <input type="text" name="location" placeholder='Enter your Permanent Location' className="form-control" required />
        <label>Password</label>
        <input type="password" name="password" placeholder='Enter your password' className="form-control" required />
        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" placeholder='Confirm your password' className="form-control" required />
        <button type="submit">Sign Up</button>
      </form>
      <p className='py-2'>Already a Member? <Link to='../patient/login'>Login</Link></p>

      

    </div>

    
  );
};

export default PatientRegister;
