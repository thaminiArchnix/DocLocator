import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { usePatient } from '../../context/Patient/patientContext';
import {dateConverter} from '../../Middleware/dateConverter'




const MakeAppointment = () => {
  const [appointments, setAppointments] = useState();
  // Function to check if the slot is available
const checkIfSlotAvailable = (appointments, date, startTime) => {
  // Iterate through the appointments array to check if there's an appointment for the given date and start time
  for (const appointment of appointments) {
    //const appD = giveUTCTime(appointment.date, 0);
    const appD = dateConverter(appointment.date);
    const appS = appointment.startTime.toString();
    const splitString = appS.slice(0, 5);

   
    console.log(`${splitString} S${startTime}`);
    if(appD === date) {
      console.log(`${appD} === ${date}`);
    }
    if(splitString === startTime){
      console.log(`${splitString} === ${startTime.toString()}`);
    }
    
    if (appD === date && splitString === startTime.toString()) {
      return false; // Slot is not available
    }
  }
  return true; // Slot is availablet
};
console.log(appointments);
// Function to get appointments for the selected doctor
const getDoctorAppointments = async (docId) => {
  try {
    const response = await axios.get(`http://localhost:3000/app/doctor/${docId}`);
    setAppointments(response.data.appointments);
    return response.data.appointments || [];
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    return [];
  }
};
  const navigate = useNavigate();
  const { userData } = usePatient();

  const [formData, setFormData] = useState({
    docId: '',
    full_name:'',
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
    const savedDocName = savedLocationData?.full_name;

    setFormData({
      ...formData,
      docId: savedDocId || '',
      full_name:savedDocName||'',
      latitude: savedLocationData?.latitude || '',
      longitude: savedLocationData?.longitude || '',
      patientId: userData.user[0].PatientId|| '',
    });
  }, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const selectedDateTime = new Date(`${formData.date}T${formData.startTime}`);
  
      // Get the current date and time
      const currentDate = new Date();
      const currentDateTime = new Date(currentDate.getTime() + (2 * 60 * 60 * 1000)); // Current date + 2 hours
  
      // Check if the selected date is in the future
      if (selectedDateTime < currentDate) {
        console.error('Please select a future date and time');
        return alert('Please select a future date and time');
      } else if (selectedDateTime <= currentDateTime) {
        console.error('Please select a date and time at least 2 hours from now');
        return alert('Please select a date and time at least 2 hours from now');
      }
  
      // Get appointments for the selected doctor
      const appointmentsForDoctor = await getDoctorAppointments(formData.docId);
      //setAppointments(appointmentsForDoctor);
      console.log(appointmentsForDoctor); //works
  
      // Check if the slot is available
      const isSlotAvailable = checkIfSlotAvailable(appointmentsForDoctor, formData.date, formData.startTime);
      if (!isSlotAvailable) {
        console.error('Selected date and time are already booked');
        return alert('Selected date and time are already booked');
      }
      console.log(isSlotAvailable);
    
      // If all checks pass, submit the form
      const createResponse = await axios.post('http://localhost:3000/app/createAppointment', formData);
      console.log('Appointment made successfully:', createResponse.data);
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

        <label>Doctor Name</label>
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
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
