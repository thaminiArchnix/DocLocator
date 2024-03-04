import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import LocationMap from '../../Components/Patient/LocationMap'; 

const API_KEY = 'AIzaSyDeA5U3PfjEtKC-lQnEQ7iO9gn8snYBSMs';

const PatientRegister = () => {
  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleChange = (newAddress) => {
    setAddress(newAddress);
  };

  const handleSelect = async (selectedAddress) => {
    setAddress(selectedAddress);

    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      console.log('Coordinates:', latLng);
      setSelectedLocation(latLng);
    } catch (error) {
      console.error('Error fetching geolocation:', error);
    }
  };

  const handleMapSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      Name: e.target.Name.value,
      Email: e.target.Email.value,
      Phone: e.target.Phone.value,
      Gender: e.target.Gender.value,
      DOB: e.target.DOB.value,
      Password: e.target.Password.value,
      Latitude: selectedLocation?.lat,
      Longitude: selectedLocation?.lng,
    };
  
    try {
      const response = await axios.post('http://localhost:3000/patient/createpatient', formData);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  

  return (
    <div className='container d-flex flex-column align-items-center justify-content-center py-5'>
      <h2>Sign Up as a Patient</h2>
      <form className='d-flex flex-column w-50 gap-2' onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input type="text" name="Name" placeholder='Enter your Full Name' className="form-control"></input>
            <label>Email</label>
            <input type="email" name="Email" placeholder='Enter your email' className="form-control"></input>
            <label>Phone Number</label>
            <input type="tel" name="Phone" placeholder='Enter your phone number' className="form-control"></input>
            <label>Gender</label>
            <select name="Gender" className="form-control">
              <option>Female</option>
              <option>Male</option>
            </select>
            <label>Date of Birth</label>
            <input type="date" name="DOB"  placeholder='Enter your Date of Birth' className="form-control"></input> 
            <label>Location</label>
            <PlacesAutocomplete
              value={address}
              onChange={handleChange}
              onSelect={handleSelect}
              googleCallbackName="initMap"
              googleCallbackParams={{ key: API_KEY, libraries: ['places'] }}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Enter your Permanent Location',
                      className: 'form-control',
                      name: 'location'
                    })}
                    required
                  />
                  <div>
                    {loading ? <div>Loading...</div> : null}

                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active ? '#41b6e6' : '#fff'
                      };

                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <LocationMap onSelectLocation={handleMapSelect} />
            <label>Password</label>
            <input type="password" name="Password" placeholder='Enter your password' className="form-control" required />
            <label>Confirm Password</label>
            <input type="password" placeholder='Confirm your password' className="form-control" required />
            <button type="submit">Sign Up</button>
      </form>
      <p className='py-2'>Already a Member? <Link to='../patient/login'>Login</Link></p>
    </div>
  );
};

export default PatientRegister;
