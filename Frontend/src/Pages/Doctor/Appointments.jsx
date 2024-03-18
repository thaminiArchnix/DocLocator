import React, { useState, useEffect } from 'react';
import NavbarContainer from '../../Components/Doctor/NavbarContainer';
import axios from 'axios';
import Day from '../../Components/Doctor/Day';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/app');
        setAppointments(response.data);
      } catch (error) {
        console.error(error);
        alert(`${error.request.response}`);
      }
    };

    fetchAppointments();
  }, []);

  
  const getUniqueDates = (apps) => {
    const uniqueDates = [];

    apps.forEach(app => {
      if (!uniqueDates.includes(app.date) && app.date !== undefined) {
            uniqueDates.push(app.date);
        };
    });
    return uniqueDates;
  };

  const appArray = Object.values(appointments);
  const dates = getUniqueDates(appArray);
  

  return (
    <div>
      <div><NavbarContainer /></div>
      {dates.sort((a, b) => new Date(b) - new Date(a)).map(date => (
        <Day key={dates.indexOf(date)} date={date} dt={'app'} />
      ))}
      
    </div>
    );
  };

export default Appointments;
