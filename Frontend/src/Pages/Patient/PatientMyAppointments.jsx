import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientNavbarContainer from '../../Components/Patient/PatientNavbarContainer';
import image from '../../assets/avatar.png';
import PatientAppointmentCard from '../../Components/Patient/PatientAppointmentCard';

const PatientMyAppointments = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Fetch appointments for the current patient
        const response = await axios.get(`http://localhost:3000/appointment/getAppointment`);
        const appointmentsData = response.data;
        setAppointments(appointmentsData);

      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [patientId]);
  console.log(appointments);
  return (

    <>
      <div><PatientNavbarContainer/></div>
      <center>
       {appointments.map((appointment) => (<PatientAppointmentCard key={appointments.indexOf(appointment)} appId={appointment.appId} docId={appointment.docId}/>))}
      </center>

    </>
  );
};

export default PatientMyAppointments;
