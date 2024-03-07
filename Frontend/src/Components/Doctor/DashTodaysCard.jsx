import React, { useEffect, useState } from 'react'
import image from '../../assets/avatar.png'; 
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


  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/patient/${props.patientId}`);
        const appoint = await axios.get(`http://localhost:3000/app/${props.appId}`) 
        setPatient(response.data);
        setAppointment(appoint.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPatientDetails();

  },[])

  const handleMap = () => {
    setMapPopup(prevMapPopup => !prevMapPopup); // Toggle the state
  };

  const location = appointment[0].longitude;
  const startTime = time(appointment[0].startTime);
  const endTime = time(calculateEndTime(appointment[0].startTime));
  const patientAge = calculateAge(patient[0].DOB);
  return (
    <>
      <div className="container-box container m-2 b-1 w-100 bg-info-subtle text-dark">
        <div className="row p-3 align-items-center justify-content-center">
        <div className="col-sm-3 d-flex justify-content-center align-items-center">
          <img src={image} className="rounded-circle" alt="Avatar" width="100" height="100"/>
        </div>
          <div className="col d-flex flex-column gap-2">
            <div className="row">
              <div className="col">{patient[0].Name}</div>
              <div className="col">{patientAge} years</div>
              <div className="col">{patient[0].Gender}</div>
            </div>
            <div className="row d-flex justify-content-between">
              <div className="col">{startTime} to {endTime}</div>
              <div className="col-sm-3 d-flex flex-wrap gap-3 justify-content-end"><button>Cancel</button></div>
            </div>
            <div className="row">
                <div className="col cursor" onClick={handleMap}>{ mapPopup ? 'Close Map' : 'Show Location'} <i className="bi bi-box-arrow-up-right p-2"></i></div>
                <div className={ mapPopup ? '' : 'hidden'}>
                  <Map longitude={parseFloat(appointment[0].longitude)} latitude={parseFloat(appointment[0].latitude)}/>
                </div>
                
            
            </div>
            <div className="row"><button className='bg-success'>Start</button></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashTodaysCard