import React, { useEffect, useState } from 'react'
import image from '../../assets/avatar.png'; 
import axios from 'axios';

const DashTodaysCard = (props) => {
  const [patient, setPatient] = useState([{}]);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/doctor/${props.patientId}`); //change this to patient
        setPatient(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPatientDetails();

  },[])
  console.log(patient);
  return (
    <>
      <div className="container-box container m-2 b-1 w-100 bg-info-subtle text-dark">
        <div className="row p-3 align-items-center justify-content-center">
        <div className="col-sm-3 d-flex justify-content-center align-items-center">
          <img src={image} className="rounded-circle" alt="Avatar" width="100" height="100"/>
        </div>
          <div className="col d-flex flex-column gap-2">
            <div className="row">
              <div className="col">{patient[0].full_name}</div>
              <div className="col">{props.age} years</div>
              <div className="col">{props.gender}</div>
            </div>
            <div className="row d-flex justify-content-between">
              <div className="col">{props.startTime} to {props.endTime}</div>
              <div className="col-sm-3 d-flex flex-wrap gap-3 justify-content-end"><button>Cancel</button></div>
            </div>
            <div className="row">
                <div className="col">{props.location} <i className="bi bi-box-arrow-up-right p-2"></i></div>
                
            
            </div>
            <div className="row"><button className='bg-success'>Start</button></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashTodaysCard