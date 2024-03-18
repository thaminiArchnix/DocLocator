import React, { useState , useEffect} from 'react'
import Appointment from './Appointment';
import axios from 'axios';
import { useDoctor } from '../../context/DoctorContext';
import {dateConverter} from '../../Middleware/dateConverter.js'


const Day = (props) => {
    const [appointments, setAppointments] = useState([]);
    const [completed, setCompleted] = useState([]);
    const { userData } = useDoctor();
  
    //fetch app appointments and filter them by doctor's Id, date and status, and set appointments
    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          const response = await axios.get('http://localhost:3000/app');
          const userapps = await Object.values(response.data).filter(app => app.docId == userData.user.id);
          const todays = await Object.values(userapps).filter(app => app.date == props.date);
          const nonCompleted = await Object.values(todays).filter(app => app.status !== 'Completed');
          const completedAppointments = await Object.values(todays).filter(app => app.status == "Completed");
          setAppointments(nonCompleted);
          setCompleted(completedAppointments);
        } catch (error) {
          console.error(error);
          alert(`${error.request.response}`);
        }
      };
  
      fetchAppointments();
    }, [userData, props]);
    
    //convert date to proper format
    const dateBanner = dateConverter(props.date);
  
    return (
      <div className='p-2'>
          <h3 className='p-2'>{dateBanner}</h3>
          {props.dt === 'app' && <div className='d-flex flex-column align-items-center'>
            {appointments.map((app, index) => (
              <Appointment 
                key={index} 
                appId={app.appId}
                patId={app.patientId} 
              />
            )).sort((a, b) => b.date - a.date)}
          </div>}
          {props.dt === 'his' && <div className='d-flex flex-column align-items-center'>
            {completed.map((app, index) => (
              <Appointment 
                key={index} 
                appId={app.appId}
                patId={app.patientId} 
              />
            )).sort((a, b) => b.date - a.date)}
          </div>}
      </div>
    );
  
  
}

export default Day
