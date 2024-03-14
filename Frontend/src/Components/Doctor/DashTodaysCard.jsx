import React, { useEffect, useState } from 'react'
import fpat from '../../assets/fpat.png'; 
import mpat from '../../assets/mpat.png';
import axios from 'axios';
import { calculateAge } from '../../Middleware/calculateAge';
import { time } from '../../Middleware/time';
import { calculateEndTime } from '../../Middleware/calculateEndTime';
import Map from './Map';
import '../../Components/Doctor/doctor.css';

const DashTodaysCard = (props) => {
  const [patient, setPatient] = useState([{}]);
  const [appointment, setAppointment] = useState([{}]);
  const [mapPopup, setMapPopup] = useState(false);
  const [status, setStatus] = useState('');
  const [endTime, setEndTime] = useState();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/patient/getpatient/${props.patientId}`);
        const appoint = await axios.get(`http://localhost:3000/app/${props.appId}`) 
        setPatient(response.data);
        setAppointment(appoint.data);
        setStatus(appoint.data[0].status);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchPatientDetails();

  },[])
  

  useEffect(() => {
    setStatus(appointment[0]?.status || '');
  },[]);
  console.log(status);
  const handleMap = () => {
    setMapPopup(prevMapPopup => !prevMapPopup); // Toggle the state
  };

  const handleCancel = async () => {
    const data = {
        "status": "Canceled"
    }
    try {
      const response = await axios.put(`http://localhost:3000/app/${props.appId}`, data);
      window.location.reload();
      setStatus('Canceled');
    } catch (error) {
      console.error(error);
    }
    
  };
  const handleStart = async () => {
    const data = {
      "status": "OnGoing"
    }
    try {
      const response = await axios.put(`http://localhost:3000/app/${props.appId}`, data);
      setStatus('OnGoing');
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error(error);
    }
  };

  const location = appointment[0].longitude;
  useEffect(()=> {
    setEndTime(calculateEndTime(appointment[0].startTime))

  }, [appointment])
  
  
  const patientAge = calculateAge(patient[0].DOB);
  return (
    <>
      <div className="container-box container m-2 b-1 w-100 bg-info-subtle text-dark">
        <div className="row p-3 align-items-center justify-content-center">
        <div className="col-sm-3 d-flex justify-content-center align-items-center">
          <img src={patient[0].Gender == "Female" ? fpat : mpat} className="rounded-circle" alt="Avatar" width="100" height="100"/>
        </div>
          <div className="col d-flex flex-column gap-2">
            <div className="row">
              <div className="col">{patient[0].Name}</div>
              <div className="col">{patientAge} years</div>
              <div className="col">{patient[0].Gender}</div>
            </div>
            <div className="row d-flex justify-content-between">
              <div className="col">{appointment[0].startTime} to {endTime}</div>
              <div className={status === 'Canceled' ? "col text-danger" : status === 'Pending' ? "col text-primary" : status === 'OnGoing' ? "col text-warning" : status === 'Completed' ? "col text-success" : "col"}>{status}</div>
              <div className="col-sm-3 d-flex flex-wrap gap-3 justify-content-end"><button className={`btn ${status === 'Canceled' ? "disabled" : "btn-primary"}`} onClick={handleCancel}>Cancel</button></div>
            </div>
            <div className="row">
                <div>{patient.Phone}</div>
                <div>Patient Notes : {appointment.disease}</div>
                <div className="col cursor" onClick={handleMap}>{ mapPopup ? 'Close Map' : 'Show Location'} <i className="bi bi-box-arrow-up-right p-2"></i></div>
                <div className={ mapPopup ? '' : 'hidden'}>
                  {mapPopup && <Map longitude={parseFloat(appointment[0].longitude)} latitude={parseFloat(appointment[0].latitude)} id={props.appId}/>}
                </div>
                
            
            </div>
            <div className="row"><button className={`btn ${status === 'Canceled' ? "disabled" : "btn-warning"}`} onClick={handleStart}>Start</button></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashTodaysCard