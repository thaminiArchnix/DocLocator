import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientNavbarContainer from '../../Components/Patient/PatientNavbarContainer';
import PatientAppointmentCard from '../../Components/Patient/PatientAppointmentCard';
import { usePatient } from '../../Context/Patient/patientContext';

const PatientHistroy = () => {
  const { userData } = usePatient();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (userData) {
          // Fetch all appointments
          const allAppointmentsResponse = await axios.get(`http://localhost:3000/appointment/getAppointment`);
          const allAppointmentsData = allAppointmentsResponse.data;
          console.log(allAppointmentsResponse);
          console.log(allAppointmentsResponse);
          console.log(allAppointmentsData);


          // Filter appointments based on the current logged-in user's patientId
          const filteredAppointments = Object.values(allAppointmentsData).filter(
            appointment => appointment.patientId == userData.user[0].PatientId &&
            (appointment.status === 'Completed' || appointment.status === 'Missed')
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
      {appointments.map((appointment) => (
        <PatientAppointmentCard key={appointment.appId} appId={appointment.appId} docId={appointment.docId} />
      ))}
    </>
  );
};

export default PatientHistroy;