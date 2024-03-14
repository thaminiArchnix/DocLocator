import React, { useState, useEffect } from 'react'
import fpat from '../../assets/fpat.png';
import mpat from '../../assets/mpat.png';
import './doctor.css'
import axios from 'axios';
import { calculateAge } from '../../Middleware/calculateAge';
//import { time } from '../../Middleware/time';
import { calculateEndTime } from '../../Middleware/calculateEndTime';
import Map from './Map';


const HistoryCard = (props) => {
  const [appointment, setAppointment] = useState({});
  const [patient, setPatient] = useState({});
  const [mapPopup, setMapPopup] = useState(false);
  const [endTime, setEndTime] = useState();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/app/${props.appId}`);
        setAppointment(response.data[0]);
        const patientUser = await axios.get(`http://localhost:3000/patient/getpatient/${props.patientId}`);
        setPatient(patientUser.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, []);
  const age = calculateAge(patient.DOB);
  useEffect(()=> {
    setEndTime(calculateEndTime(appointment.startTime))

  }, [appointment])
  
  const handleMap = () => {
    setMapPopup(prevMapPopup => !prevMapPopup); 
  };

  return (
    <>
      <div className="container-box container m-2 b-1 history w-50">
        <div className="row p-3 align-items-center justify-content-center">
          <div className="col-sm-3 d-flex justify-content-center align-items-center">
            <img src={patient.Gender == "Female" ? fpat : mpat} className="rounded-circle" alt="Avatar" width="100" height="100"/>
          </div>
          <div className="col d-flex flex-column gap-2">
            <div className="row d-flex flex-row flex-wrap">
              <div className="col">{patient.Name}</div>
              <div className="col">{age} years</div>
              <div className="col">{patient.Gender}</div>
            </div>
            <div className="row d-flex flex-wrap justify-content-between">
              <div className="col">{appointment.startTime} to {endTime}</div>
              <div className="col-sm-3 d-flex justify-content-end text-success">{appointment.status}</div>
            </div>
                <div>{patient.Phone}</div>
                <div>Patient Notes : {appointment.disease}</div>
                <div className="col cursor" onClick={handleMap}>{ mapPopup ? 'Close Map' : 'Show Location'} <i className="bi bi-box-arrow-up-right p-2"></i></div>
                <div className={ mapPopup ? '' : 'hidden'}>
                  {mapPopup && <Map longitude={parseFloat(appointment.longitude)} latitude={parseFloat(appointment.latitude)} id={appointment.appId}/>}
                </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HistoryCard