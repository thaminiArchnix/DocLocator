import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDoctor } from '../../context/DoctorContext.jsx';
import axios from 'axios';
import '../../Components/Doctor/doctor.css';
import LocationMap from '../../Components/LocationMap.jsx';
import { isValidPassword } from '../../Middleware/isValidPassword.js';
import { isValidPhone } from '../../Middleware/isValidPhone.js';
import { isValidEmail } from '../../Middleware/isValidEmail.js';

const Register = () => {
  const [selectedLocation, setSelectedLocation] = useState({ lat: null, lng: null });
  const navigate = useNavigate();
  const { updateUser } = useDoctor();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    date_of_birth: '',
    password: '',
    confirmpassword: '',
    gender: 'Female',
    phone_number: '',
    specialization: '',
    longitude: '',
    latitude: '',
  });

  const { full_name, email, date_of_birth, password, confirmpassword, gender, phone_number, specialization, longitude, latitude, address } = formData;

  const handleMapSelect = (location) => {
    setSelectedLocation(location);
  };
  

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = isValidPassword(password);
    const phone = isValidPhone(phone_number);
    const emailValidation = isValidEmail(formData.email);
    const currentDate = new Date;
    const dateOfBirth = new Date(formData.date_of_birth);
    
    if(dateOfBirth >= currentDate) {
      console.error('Enter a valid date of Birth');
      alert(`Enter a valid date of birth`);
      return;
    }

    if(emailValidation == false) {
      console.error('Enter a valid Email!');
      alert('Enter a valid Email!');
      return;
    }
    
    if(validation == false) {
      console.error('Enter a valid Password!');
      alert('Enter a strong password!');
      return;
    };

    if(phone == false) {
      console.error('Enter a valid phone number!');
      alert('Enter a valid phone number!');
      return;
    };

    if (password === confirmpassword) {
      const userData = {
        full_name: full_name,
        email: email,
        date_of_birth: date_of_birth,
        password: password,
        gender: gender,
        phone_number: phone_number,
        specialization: specialization,
        longitude: selectedLocation.lng,
        latitude: selectedLocation.lat,
      };

      try {
        //issue with logic? token saved in localStorage?
        const response = await axios.post('http://localhost:3000/doctor/', userData);

        localStorage.setItem('token', response.data.token); //unused token for access
        updateUser(userData);
        const email = { email : response.data.email};
        const doctor = await axios.post('http://localhost:3000/auth/verify', email);
        navigate('/doctor/auth');

      } catch (error) {
        console.error('Error signing up:', error);
        alert(`Error signing up: ${error.request.responseText}`);
        
      }
    } else {
      console.error('Passwords do not match');
      alert('Please confirm the password');
    }
  };
  
  return (
    <div className='container d-flex flex-column align-items-center justify-content-center py-5'>
        <h2>Sign Up as a Doctor</h2>
        <form className='d-flex flex-column w-50 gap-2' onSubmit={handleSubmit}>
            <label>Full Name <span id='red-star'>*</span></label>
            <input type="text" value={full_name} placeholder='Enter your Full Name' className="form-control" onChange={onChange} name='full_name'></input>
            <label>Email <span id='red-star'>*</span></label>
            <input type="email" value={email} placeholder='Enter your email' className="form-control" onChange={onChange} name='email'></input>
            <label>Phone Number <span id='red-star'>*</span></label>
            <input type="tel" value={phone_number} placeholder='Enter your phone number' className="form-control" onChange={onChange} name='phone_number'></input>
            <label>Gender <span id='red-star'>*</span></label>
            <select value={gender} className="form-control" onChange={onChange} name='gender'>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
            <label>Date of Birth <span id='red-star'>*</span></label>
            <input type="date" value={date_of_birth} placeholder='Enter your Date of Birth' className="form-control" onChange={onChange} name='date_of_birth'></input>
            <label>Specialization <span id='red-star'>*</span></label>
            <input type="text" value={specialization} placeholder='Enter your Specialization' className="form-control" onChange={onChange} name='specialization'></input>
            <label>Service Location <span id='red-star'>*</span></label>
            <LocationMap onSelectLocation={handleMapSelect}/>
            <label>Password <span id='red-star'>*</span></label>
            <input type="password" value={password} placeholder='Enter your password' className="form-control" onChange={onChange} name='password'></input>
            <label>Confirm Password <span id='red-star'>*</span></label>
            <input type="password" value={confirmpassword} placeholder='Confirm your password' className="form-control" onChange={onChange} name='confirmpassword'></input>
            <button type='submit' className='btn btn-primary'>Sign Up</button>
        </form>
        <p className='py-2'>Already a Member? <Link to='../doctor/login'>Login</Link></p>
        
    </div>
  )
}

export default Register