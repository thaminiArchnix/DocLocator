import React, { useState, useEffect } from 'react';
import NavbarContainer from '../../Components/Doctor/NavbarContainer';
import AppointmentDay from '../../Components/Doctor/AppointmentDay';
import axios from 'axios';


const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/app');
        setAppointments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, []);

  
  const appArray = Object.values(appointments);
  

  const getUniqueDates = (apps) => {
    const uniqueDates = [];

    apps.forEach(app => {
      if (!uniqueDates.includes(app.date) && app.date !== undefined) {
            uniqueDates.push(app.date);
        };
    });
    return uniqueDates;
  };

  const dates = getUniqueDates(appArray);
  

  return (
    <div>
      <div><NavbarContainer /></div>
      {dates.map(date => (
        <AppointmentDay key={dates.indexOf(date)} date={date}/>
      ))}
      
    </div>
    );
  };

export default Appointments;
