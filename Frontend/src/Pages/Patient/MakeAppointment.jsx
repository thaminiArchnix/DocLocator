import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';

const MakeAppointment = () => {

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      docId: e.target.docId.value,
      patientId: e.target.patientId.value,
      date: e.target.date.value,
      startTime: e.target.startTime.value,
      closedTime: e.target.closedTime.value,
      status: e.target.status.value,
      Radius: e.target. Radius.value,
      latitude: selectedLocation?.lat,
      longitude: selectedLocation?.lng,
    };
    
  
    try {
      const response = await axios.post('http://localhost:3000/appointment/createAppointment', formData);
      console.log('Appointment made successful:', response.data);
      navigate('/appointment/myappointments');
    } catch (error) {
      console.error('Request error:', error);
    }
  };
  

  return (
    <div className='container d-flex flex-column align-items-center justify-content-center py-5'>
      <h2>Make a Appointment</h2>
      <form className='d-flex flex-column w-50 gap-2' onSubmit={handleSubmit}>
            <label>Your ID</label>
            <input type="tenumberxt" name="patientId" placeholder='' className="form-control"></input>
            <label>Doctor ID</label>
            <input type="number" name="docId" placeholder='' className="form-control"></input>
            <label>Select Time</label>
            <input type="time" name="Phone" placeholder='Select time slot' className="form-control"></input>
            <label>Description of Disease</label>
            <input type="textarea" name="Phone" placeholder='Give breife explanation of disease' className="form-control"></input>
          

            <button type="submit">Submit</button>
      </form>
      <p className='py-2'>Already a Member? <Link to='../patient/login'>Login</Link></p>
    </div>
  );
};

export default MakeAppointment;
