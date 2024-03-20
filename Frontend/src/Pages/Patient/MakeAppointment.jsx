import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { usePatient } from '../../context/Patient/patientContext';
import { dateConverter } from '../../Middleware/dateConverter';
import CustomAlert from '../../Components/Patient/CustomAlert'; // Import CustomAlert component

const MakeAppointment = () => {
  const [appointments, setAppointments] = useState();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  
  // Function to check if the slot is available
// const checkIfSlotAvailable = (appointments, date, startTime) => {
//   for (const appointment of appointments) {
//     const appD = dateConverter(appointment.date);
//     const appS = appointment.startTime.toString();
//     const splitString = appS.slice(0, 5);

//     if (appD === date && splitString === startTime.toString() && appointment.status !== 'Canceled') {
//       return false; // Slot is not available
//     }
//   }
//   return true; // Slot is available
// };


// Function to check if the slot is available
const checkIfSlotAvailable = (appointments, date, startTime) => {
  // Convert selected start time to minutes for comparison
  const selectedTimeInMinutes = Number(startTime.substring(0, 2)) * 60 + Number(startTime.substring(3, 5));

  for (const appointment of appointments) {
    const appD = dateConverter(appointment.date);
    const appS = appointment.startTime.toString();
    const splitString = appS.slice(0, 5);

    // Convert existing appointment start time to minutes for comparison
    const existingTimeInMinutes = Number(splitString.substring(0, 2)) * 60 + Number(splitString.substring(3, 5));

    // Check if selected time matches an existing appointment start time or is less than 2 hours after an existing appointment
    if (appD === date && splitString === startTime.toString()) {
      return false; // Slot is not available
    } else if (appD === date && selectedTimeInMinutes - existingTimeInMinutes < 120) {
      return false; // Slot is not available
    }
  }
  return true; // Slot is available
};




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
    full_name: '',
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
      full_name: savedDocName || '',
      latitude: savedLocationData?.latitude || '',
      longitude: savedLocationData?.longitude || '',
      patientId: userData.user[0].PatientId || '',
    });
  }, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedDateTime = new Date(`${formData.date}T${formData.startTime}`);
      const currentDate = new Date();
      const currentDateTime = new Date(currentDate.getTime() + (2 * 60 * 60 * 1000));

      if (selectedDateTime < currentDate) {
        setAlertMessage('Please select a future date and time');
        setAlertType('error');
        return;
      } else if (selectedDateTime <= currentDateTime) {
        setAlertMessage('Please select a date and time at least 2 hours from now');
        setAlertType('error');
        return;
      }

      const appointmentsForDoctor = await getDoctorAppointments(formData.docId);

      const isSlotAvailable = checkIfSlotAvailable(appointmentsForDoctor, formData.date, formData.startTime);
      if (!isSlotAvailable) {
        setAlertMessage('Selected date and time are already booked');
        setAlertType('error');
        return;
      }

      const createResponse = await axios.post('http://localhost:3000/app/createAppointment', formData);
      console.log('Appointment made successfully:', createResponse.data);
      setAlertMessage('Appointment made successfully');
      setAlertType('success');
    } catch (error) {
      console.error('Request error:', error);
      setAlertMessage('Error submitting appointment');
      setAlertType('error');
    }
  };

  return (
    <div className='container d-flex flex-column align-items-center justify-content-center py-5'>
      <h2>Make an Appointment</h2>
      {alertMessage && <CustomAlert type={alertType} message={alertMessage} onClose={() => setAlertMessage('')} />}
      <form className='d-flex flex-column w-50 gap-2' onSubmit={handleSubmit}>
        {/* <label>Your ID</label>
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
        /> */}

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
          required
        />

        <label>Select Time</label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          placeholder='Select time slot'
          className="form-control"
          onChange={handleChange}
          required
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
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
      <p className='py-2'>
        Need to check that appointment? <Link to='../patient/myappointment'>My Appointments</Link>
      </p>
    </div>
  );
};

export default MakeAppointment;
