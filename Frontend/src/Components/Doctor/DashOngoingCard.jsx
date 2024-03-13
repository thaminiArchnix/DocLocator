import React, { useEffect, useState } from 'react'
import fpat from '../../assets/fpat.png'; 
import mpat from '../../assets/mpat.png'; 
import axios from 'axios';
import { calculateAge } from '../../Middleware/calculateAge';
import { time } from '../../Middleware/time';
import { calculateEndTime } from '../../Middleware/calculateEndTime';
import Map from '../Doctor/Map.jsx'


const DashOngoingCard = (props) => {
  const [appointment, setAppointment] = useState([]);
  const [patient, setPatient] = useState([]);
  const [mapPopup, setMapPopup] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    setStatus(appointment.status);
  },[appointment]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/app/${props.appId}`);
        setAppointment(response.data[0]);
        
        const patient = await axios.get(`http://localhost:3000/patient/getpatient/${props.patientId}`);
        setPatient(patient.data[0]);
      } catch (error) {
        
      }
    }
    fetchDetails();
  }, [status])
  const handleMap = () => {
    setMapPopup(prevMapPopup => !prevMapPopup); // Toggle the state
  };
  const handleCompleted = async () => {
    const data = {
      "status": "Completed"
    }
    try {
      const response = await axios.put(`http://localhost:3000/app/${props.appId}`, data);
      setStatus('Completed');
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error(error);
    }
  }
  const age = calculateAge(patient.DOB);
  const startTime = time(appointment.startTime);
  const endTime = time(calculateEndTime(appointment.startTime));

  return (
    <>
    <div className="container-box container m-2 b-1 w-100 bg-info-subtle text-dark">
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
            <div className="col">{startTime} to {endTime}</div>
            <div className={status === 'Canceled' ? "col text-danger" : status === 'Pending' ? "col text-primary" : status === 'OnGoing' ? "col text-warning" : status === 'Completed' ? "col text-success" : "col"}>{status}</div>
            {/* <div className="col-sm-3 d-flex flex-wrap gap-3 justify-content-end"><button>Cancel</button></div> */}
          </div>
          <div className="row">
              <div className="col cursor" onClick={handleMap}>{ mapPopup ? 'Close Map' : 'Show Location'} <i className="bi bi-box-arrow-up-right p-2"></i></div>
                <div className={ mapPopup ? '' : 'hidden'}>
                  {mapPopup && <Map longitude={parseFloat(appointment.longitude)} latitude={parseFloat(appointment.latitude)} id={props.appId}/>}
                </div>
              
          
          </div>
          <div className="row"><button className='btn btn-success' onClick={handleCompleted}>Completed</button></div>
        </div>
      </div>
    </div>
  </>
  )
}

export default DashOngoingCard