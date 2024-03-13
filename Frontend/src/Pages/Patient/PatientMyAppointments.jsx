import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientNavbarContainer from '../../Components/Patient/PatientNavbarContainer';
import PatientAppointmentCard from '../../Components/Patient/PatientAppointmentCard';
import { usePatient } from '../../context/Patient/patientContext';

const PatientMyAppointments = () => {
  const { userData } = usePatient();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (userData) {
          
          const allAppointmentsResponse = await axios.get(`http://localhost:3000/app/`);
          const allAppointmentsData = allAppointmentsResponse.data;
          console.log(allAppointmentsResponse);
          console.log(allAppointmentsResponse);
          console.log(allAppointmentsData);


    
          const filteredAppointments = Object.values(allAppointmentsData).filter(appointment => 
            appointment.patientId === userData.user[0].PatientId &&
            (appointment.status === "Ongoing" || appointment.status === "Pending")
          );
          
            console.log(userData.user)
          setAppointments(filteredAppointments);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    //console.log(filteredAppointments);

    fetchAppointments();
  }, [userData]);
   console.log(appointments);
  return (
    <>
      <div><PatientNavbarContainer/></div>
      <div className='d-flex flex-column align-items-center'>
        {appointments.map((appointment) => (
          <PatientAppointmentCard key={appointment.appId} appId={appointment.appId} docId={appointment.docId} />
        ))}
      </div>
      
    </>
  );
};

export default PatientMyAppointments;
