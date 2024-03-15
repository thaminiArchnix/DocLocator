import React, {useState, useEffect} from 'react'
import {dateConverter} from '../../Middleware/dateConverter.js'
import axios from 'axios'
import { useDoctor } from '../../context/DoctorContext.jsx'
import Appointment from './Appointment.jsx'

const HistoryDay = (props) => {
  const {userData} = useDoctor();
  const [appointments, setAppointments] = useState([]);

  //fetch all appointments, filter them by doctor's id, status and date. set appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/app');
        const apps = Object.values(response.data).filter(app => app.docId == userData.user.id);
        const completedAppointments = apps.filter(app => app.status == "Completed");
        const appsByDate = completedAppointments.filter(app => app.date == props.date);
        setAppointments(appsByDate);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppointments();
  }, []);

  //get date in relevant format
  const dateBanner = dateConverter(props.date);

  return (
    <div>
        <div className='p-2'>
            <h3 className='p-2 px-5'>{dateBanner}</h3>
            <div className='d-flex flex-wrap justify-content-center align-items-center'>
              {appointments.map(app => (<Appointment key={appointments.indexOf(app)}appId={app.appId} patId={app.patientId}/>))}
            </div>
        </div>
    </div>
  )
}

export default HistoryDay