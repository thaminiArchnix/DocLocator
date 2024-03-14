import React, { useState, useEffect } from 'react';
import fdoc from '../../assets/fdoc.png';
import mdoc from '../../assets/mdoc.png';
import axios from 'axios';

const PatientAppointmentCard = (props) => {
  const [appointment, setAppointment] = useState({});
  const [docData, setDocData] = useState([]);
  const [status, setStatus] = useState('Pending');


  useEffect(() => {
    setStatus(appointment.status);
  },[appointment]);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/app/${props.appId}`);
        setAppointment(response.data[0]);

        const doctor = await axios.get(`http://localhost:3000/doctor/${props.docId}`);
        setDocData(doctor.data[0]);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointment();
  }, []);

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
    
  };

  return (
    <>
      <div className="container-box-card container m-2 w-40 card-container p-4 bg-light shadow" style={{ border: 'none', width: '66.67% !important' }}>
        <div className="row align-items-center card-content">
          <div className="col-sm-3 d-flex justify-content-center align-items-center">
            <img src={docData.gender === 'female' ? fdoc : mdoc} className="rounded-circle" alt="Avatar" width="200" height="200" />
          </div>
          <div className="col d-flex flex-column gap-4">
            <div className="row">
              <div className="col">Name of Doctor: {docData.full_name}</div>
            </div>
            <div className="row justify-content-between">
              <div className="col">Specialization: {docData.specialization}</div>
            </div>
            <div className="row justify-content-between">
              <div className="col">Time: {appointment.startTime}</div>
            </div>
            <div className="row justify-content-between">
              <div className="col">Date: {appointment.date}</div>
            </div>
            
            <div className="row d-flex justify-content-between">
              
              <div className={status === 'Canceled' ? "col text-danger" : status === 'Pending' ? "col text-primary" : status === 'Missed' ? "col text-warning" : status === 'OnGoing' ? "col text-warning" : status === 'Completed' ? "col text-success" : "col"}>{status}</div>
              <div className="col-sm-3 d-flex justify-content-end">
              <button
                className={`btn ${status === 'Completed' || status === 'Ongoing' || status === 'Missed' || status === 'Canceled' ? 'disabled' : 'btn-primary'}`}
                onClick={handleCancel}
                disabled={status === 'Completed' || status === 'Ongoing' || status === 'Canceled' || status === 'Missed'}
              >
                Cancel
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientAppointmentCard;
