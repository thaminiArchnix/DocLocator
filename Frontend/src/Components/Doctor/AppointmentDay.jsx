import React, { useEffect, useState } from 'react';
import AppointmentCard from './AppointmentCard';
import axios from 'axios';
import { useDoctor } from '../../context/DoctorContext';

const AppointmentDay = (props) => {
  const [appointments, setAppointments] = useState([]);
  const { userData } = useDoctor();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/app');
        const userapps = await Object.values(response.data).filter(app => app.docId == userData.user.id);
        const todays = await Object.values(userapps).filter(app => app.date == props.date);
        setAppointments(todays);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, [userData, props]); // Include userData.id in the dependency array



  const appArray = Object.values(appointments);
  console.log(appArray);


  const convert = (keyDate) => {
    const date = new Date(keyDate); 
    const formattedDate = date.toString().substring(0,16);
    return formattedDate;
  };
  const convertDate = convert(props.date);

  return (
    <div className='p-2'>
        <h3 className='p-2'>{convertDate}</h3>
        <div className='d-flex flex-column align-items-center'>
          {appointments.map((app, index) => (
            <AppointmentCard 
              key={index} 
              appId={app.appId}
              patId={app.patientId} 
            />
          ))}
        </div>
    </div>
  );
};

export default AppointmentDay;
