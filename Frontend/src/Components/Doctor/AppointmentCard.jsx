import React, { useState, useEffect } from 'react';
import fpat from '../../assets/fpat.png'; 
import mpat from '../../assets/mpat.png'; 
import axios from 'axios'
import Map from '../Doctor/Map.jsx'
import { calculateAge } from '../../Middleware/calculateAge.js';
import { time } from '../../Middleware/time.js';
import { calculateEndTime } from '../../Middleware/calculateEndTime.js';

const AppointmentCard = (props) => {
  const [appointment, setAppointment] = useState({});
  const [patient, setPatient] = useState({});
  const [mapPopup, setMapPopup] = useState(false);
  const [status, setStatus] = useState('Pending');
  const [endTime, setEndTime] = useState();

  useEffect(() => {
    setStatus(appointment.status);
  },[appointment]);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/app/${props.appId}`); 
        setAppointment(response.data[0]);
        const patient = await axios.get(`http://localhost:3000/patient/getpatient/${props.patId}`);
        setPatient(patient.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, []);

  const handleMap = () => {
    setMapPopup(prevMapPopup => !prevMapPopup); // Toggle the state
  };

  const handleCancel = async () => {
    const data = {
        "status": "Canceled"
    }
    try {
      const response = await axios.put(`http://localhost:3000/app/${props.appId}`, data);
      setStatus('Canceled');
    } catch (error) {
      console.error(error);
    }
    
  }
  useEffect(()=> {
    setEndTime(calculateEndTime(appointment.startTime))

  }, [appointment])

  const age = calculateAge(patient.DOB);
  //const startTime = time(appointment.startTime);
  
  console.log(parseFloat(appointment.longitude), parseFloat(appointment.latitude));


  return (
    <>
      <div className={status === 'Missed' ? "container-box container m-2 b-1 w-75 bg-danger text-white" : "container-box container m-2 b-1 w-75"}>
        <div className="row p-3 align-items-center justify-content-center">
        <div className="col-sm-3 d-flex justify-content-center align-items-center">
          <img src={patient.Gender == "Female" ? fpat : mpat} className="rounded-circle" alt="Avatar" width="100" height="100"/>
        </div>
          <div className="col d-flex flex-column gap-2">
            <div className="row">
              <div className="col">{patient.Name}</div>
              <div className="col">{age} years</div>
              <div className="col">{patient.Gender}</div>
            </div>
            <div className="row d-flex justify-content-between">
              <div className="col">{appointment.startTime} to {endTime}</div>
              <div className={status === 'Canceled' ? "col text-danger" : status === 'Pending' ? "col text-primary" : status === 'OnGoing' ? "col text-warning" : status === 'Completed' ? "col text-success" : "col"}>{status}</div>
              <div className="col-sm-3 d-flex justify-content-end"><button className={`btn ${status === 'Canceled' ? "disabled" : status === 'Missed' ? "disabled": "btn-primary"}`} onClick={handleCancel}>Cancel</button></div>
            </div>
                <div>{patient.Phone}</div>
                <div className="col cursor" onClick={handleMap}>{ mapPopup ? 'Close Map' : 'Show Location'} <i className="bi bi-box-arrow-up-right p-2"></i></div>
                <div className={ mapPopup ? '' : 'hidden'}>
                  {mapPopup && <Map longitude={parseFloat(appointment.longitude)} latitude={parseFloat(appointment.latitude)} id={appointment.appId}/>}
                </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentCard;
