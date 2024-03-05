import React, { useState, useEffect } from 'react';
import NavbarContainer from '../../Components/Doctor/NavbarContainer';
import AppointmentDay from '../../Components/Doctor/AppointmentDay';
import axios from 'axios';
import AppointmentCard from '../../Components/Doctor/AppointmentCard';

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
        if (!uniqueDates.includes(app.date)) {
            uniqueDates.push(app.date);
        }
    });

    return uniqueDates;
  };


  const dates = getUniqueDates(appArray);
  dates.forEach(date => {
    const appointmentsForDate = appArray.filter(appointment => appointment.date === date);
    console.log(`Appointments for ${date}:`, appointmentsForDate);
  });
  
  const gmtDates = dates.map(key => {
      if (!key) return '';
  
      const date = new Date(key); // Create Date object from date string
      const dateString = date.toISOString().split('T')[0];
      return dateString;
  });
  
  console.log(gmtDates);
  const appointmentDayComponents = dates.map(date => (
    <div key={date}>
        <AppointmentDay date={date} />
        {appArray
            .filter(appointment => appointment.date === date)
            .map((appointment, index) => (

                <div key={index}>
                    {
                    <AppointmentCard name={appointment.full_name} age="32" gender="Female" startTime="11.30 a.m." endTime="12.30 p.m." location="123, Union Place, Colombo"/>}
                </div>
            ))
        }
    </div>
  ));


  // Filter appointments after they have been fetched
  useEffect(() => {
    gmtDates.forEach(date => {
      const appointmentsForDate = appArray.filter(appointment => appointment.date === date);
      console.log(`Appointments for ${date}:`, appointmentsForDate);
    });
  }, [appointments, gmtDates]);

  return (
    <div>
      <div><NavbarContainer /></div>
      <div>
        {appointmentDayComponents}
      </div>
    </div>
    );
  };

export default Appointments;
