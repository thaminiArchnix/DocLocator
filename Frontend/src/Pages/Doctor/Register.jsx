import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDoctor } from '../../context/DoctorContext.jsx';
import axios from 'axios';
import LocationMap from '../../Components/LocationMap.jsx';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

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
    gender: '',
    phone_number: '',
    specialization: '',
    longitude: '',
    latitude: '',
    address: '', // New state for the address
  });

  const { full_name, email, date_of_birth, password, confirmpassword, gender, phone_number, specialization, longitude, latitude, address } = formData;

  const handleSelect = async (selectedAddress) => {
    setFormData((prevState) => ({ ...prevState, address: selectedAddress }));
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setSelectedLocation(latLng);
    } catch (error) {
      console.error('Error fetching geolocation:', error);
    }
  };

  const handleMapSelect = (location) => {
    setSelectedLocation(location);
  };
  

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const isValidPassword = (password) => {
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const digitOrSymbolRegex = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    return (
      password.length >= 8 &&
      lowerCaseRegex.test(password) &&
      upperCaseRegex.test(password) &&
      digitOrSymbolRegex.test(password)
    );
  };

  const isValidPhone = (phone) => {
    const regex = /^\d{10}$/;
    return (
      phone.length === 10 &&
      regex.test(phone)
    );
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = isValidPassword(password);
    const phone = isValidPhone(phone_number);
    
    if(validation == false) {
      console.error('Enter a valid Password!');
      return;
    };

    if(phone == false) {
      console.error('Enter a valid phone number!');
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

        const response = await axios.post('http://localhost:3000/doctor/', userData);

        localStorage.setItem('token', response.data.token);
        updateUser(userData);
        const email = { email : response.data.email};
        const doctor = await axios.post('http://localhost:3000/auth/verify', email);
        navigate('/doctor/auth');
        

      } catch (error) {
        console.error('Error signing up:', error);
      }
    } else {
      console.error('Passwords do not match');
    }
  };
  
  

  return (
    <div className='container d-flex flex-column align-items-center justify-content-center py-5'>
        <h2>Sign Up as a Doctor</h2>
        <form className='d-flex flex-column w-50 gap-2' onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input type="text" value={full_name} placeholder='Enter your Full Name' className="form-control" onChange={onChange} name='full_name'></input>
            <label>Email</label>
            <input type="email" value={email} placeholder='Enter your email' className="form-control" onChange={onChange} name='email'></input>
            <label>Phone Number</label>
            <input type="tel" value={phone_number} placeholder='Enter your phone number' className="form-control" onChange={onChange} name='phone_number'></input>
            <label>Gender</label>
            <select value={gender} className="form-control" onChange={onChange} name='gender'>
              <option>None</option>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
            <label>Date of Birth</label>
            <input type="date" value={date_of_birth} placeholder='Enter your Date of Birth' className="form-control" onChange={onChange} name='date_of_birth'></input>
            <label>Specialization</label>
            <input type="text" value={specialization} placeholder='Enter your Specialization' className="form-control" onChange={onChange} name='specialization'></input>
            <label>Permanent Location</label>
            <LocationMap onSelectLocation={handleMapSelect}/>
            <label>Password</label>
            <input type="password" value={password} placeholder='Enter your password' className="form-control" onChange={onChange} name='password'></input>
            <label>Confirm Password</label>
            <input type="password" value={confirmpassword} placeholder='Confirm your password' className="form-control" onChange={onChange} name='confirmpassword'></input>
            <button type='submit'>Sign Up</button>
        </form>
        <p className='py-2'>Already a Member? <Link to='../doctor/login'>Login</Link></p>
        
    </div>
  )
}

export default Register