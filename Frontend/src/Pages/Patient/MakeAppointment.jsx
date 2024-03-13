import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { usePatient } from '../../context/Patient/patientContext';

const MakeAppointment = () => {
  const navigate = useNavigate();
  const { userData } = usePatient();
  const [docId, setDocId] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [patientId, setPatientId] = useState('');

  const [formData, setFormData] = useState({
    docId: '',
    patientId: '',
    date: '',
    startTime: '',
    status: 'Pending',
    latitude: '',
    longitude: '',
    disease: '',
  });

  useEffect(() => {
    const savedLocationData = JSON.parse(localStorage.getItem('selectedLocation'));
    const savedDocId = savedLocationData?.docId;
  
    console.log(savedDocId);
    console.log(savedLocationData);
  
    setFormData({
      ...formData,
      docId: savedDocId || '',
      latitude: savedLocationData?.latitude || '',
      longitude: savedLocationData?.longitude || '',
      patientId: userData.user[0].PatientId|| '',
    });
  }, [userData]);
  console.log(formData) 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/app/createAppointment', formData);
      console.log('Appointment made successfully:', response.data);
      navigate('/patient/myappointment');
    } catch (error) {
      console.error('Request error:', error);
    }
  };
  return (
    <div className='container d-flex flex-column align-items-center justify-content-center py-5'>
      <h2>Make an Appointment</h2>
      <form className='d-flex flex-column w-50 gap-2' onSubmit={handleSubmit}>
      <label>Your ID</label>
        <input
          type="text"
          name="patientId"
          value={formData.patientId}
          readOnly
          className="form-control"
        />

        <label>Doctor ID</label>
        <input
          type="text"
          name="docId"
          value={formData.docId}
          readOnly
          className="form-control"
        />

        <label>Select Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          placeholder='Select time slot'
          className="form-control"
          onChange={handleChange}
        />

        <label>Select Time</label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          placeholder='Select time slot'
          className="form-control"
          onChange={handleChange}
        />

        <label>Description of Disease</label>
        <textarea
          id="disease"
          name="disease"
          value={formData.disease}
          rows="4"
          cols="50"
          placeholder="Enter your description here..."
          onChange={handleChange}
        ></textarea>

        <button type="submit">Submit</button>
      </form>
      <p className='py-2'>
        Need to change the doctor? <Link to='../patient/dashboard'>Home</Link>
      </p>
    </div>
  );
};

export default MakeAppointment;
