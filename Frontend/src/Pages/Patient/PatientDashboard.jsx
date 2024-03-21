import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import PatientNavbarContainer from '../../Components/Patient/PatientNavbarContainer';
import app from '../../assets/app.jpg';
import '../../Components/Patient/patient.css';
import NearestDoctorsList from '../../Components/Patient/NearestDoctorList';
import axios from 'axios';
import '../../Components/Patient/CustomAlert.css'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import LocationMap from '../../Components/Patient/LocationMap';
import { usePatient } from '../../context/Patient/patientContext';
import CustomAlert from '../../Components/Patient/CustomAlert'; 

const API_KEY = 'AIzaSyDeA5U3PfjEtKC-lQnEQ7iO9gn8snYBSMs';

const saveLocationToLocalStorage = (latitude, longitude, docId, full_name) => {

  const locationData = {
    latitude,
    longitude,
    docId,
    full_name,
  };

  localStorage.setItem('selectedLocation', JSON.stringify(locationData));
};

const PatientDashboard = () => {
  const { userData } = usePatient();
  console.log(userData);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDoctorName, setSelectedDoctorName] = useState(null);
  const [specialization, setSpecialization] = useState('');
  const [radius, setRadius] = useState('');
  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [nearestDoctors, setNearestDoctors] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  

  const handleChange = (newAddress) => {
    setAddress(newAddress);
  };

  const handleSelectDoctor = (doctorId, full_name) => {
    setSelectedDoctor(doctorId);
    setSelectedDoctorName(full_name);
  };
  

  const handleSelect = async (selectedAddress) => {
    setAddress(selectedAddress);

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

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

     // Check if the radius is within the range 0-30
    if (radius < 0 || radius > 30) {
      setAlertMessage('Please enter a range between 0 and 20 kilometers.');
      setAlertType('warning');
      return;
    }

    try {
      const allDoctorsResponse = await axios.get('http://localhost:3000/doctor');
      const allDoctorsData = allDoctorsResponse.data;
       console.log(allDoctorsResponse.data);

      const doctorsWithinRadius = Object.values(allDoctorsData).filter((doctor) => {
        const distance = calculateDistance(
          parseFloat(doctor.latitude),
          parseFloat(doctor.longitude),
          selectedLocation.lat,
          selectedLocation.lng
        );

        return (
          distance <= parseFloat(radius) &&
          doctor.specialization.toLowerCase() === specialization.toLowerCase()
        );
      });

      setNearestDoctors(doctorsWithinRadius);

      if (selectedLocation && doctorsWithinRadius.length > 0) {
        saveLocationToLocalStorage(selectedLocation.lat, selectedLocation.lng, doctorsWithinRadius[0].id , doctorsWithinRadius[0].full_name);
      }

    } catch (error) {
      setAlertMessage('Error fetching doctors:', error);
      setAlertType('error');
      console.error('Error fetching doctors:', error);
    }
  };
  return (
    <div className='d-block'>
      <div><PatientNavbarContainer/></div>
      <h5 className='p-2'>Hello, {userData.user[0].Name}</h5>
      <div className='row-sm-11 d-flex flex-wrap align-items-center jistify-content-center'>
        <div className="col-sm-6 text-justify p-5"><h6>Welcome to DocLocator!</h6>
        <p>Whether you're at the clinic, in the comfort of your home, or on the move, DocLocator is here to help you make informed decisions and receive personalized care. Join our community of patients committed to improving health outcomes and accessing innovative healthcare solutions. Together, let's pave the way for a brighter future in medicine and revolutionize the delivery of healthcare for everyone's benefit.</p></div>
        <div className="col-sm-5 d-flex align-items-center justify-content-center"><img src={app} alt="app" /></div>
        <div className='d-flex flex-column justify-content-center align-items-center w-100 p-2'>{alertMessage && <CustomAlert type={alertType} message={alertMessage} onClose={() => setAlertMessage('')} />}</div>
      </div>
      <div className='d-flex justify-content-center gap-3 pt-5 flex-wrap'>
        <div className="col-sm-8 p-0 d-flex flex-column gap-2 ">
          <div className="row p-5 bg-dark-subtle rounded">
            <h3 className='p-1 text-center'>Find Your Doctor</h3><br></br>
            <section className="text-center">
              <div className="row">
                <div className="col-lg-12">
                
      
                  <form onSubmit={handleSearchSubmit}>
                    <div className="mb-3">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <label htmlFor="specialization" className="form-label">Specialization</label>
                    </div>
                      <input type="text" className="form-control" id="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
                    </div>
                    <div className="mb-3" >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                         <label htmlFor="radius" className="form-label">Range (in kilometers)</label>
                      </div>
                          <input type="number" className="form-control" id="radius" value={radius} onChange={(e) => setRadius(e.target.value)} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <label className="form-label" htmlFor="form3Example1">Current Location</label>
                    </div>
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
                              placeholder: 'Select your current Location',
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
                    <div className="text-center text-md-start mt-3">
                      <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                  </form>
                </div>
                <div className="col-lg-7">
                <NearestDoctorsList doctors={nearestDoctors} onSelectDoctor={handleSelectDoctor} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
