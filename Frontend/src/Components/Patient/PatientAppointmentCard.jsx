import React, { useState , useEffect } from 'react';
import image from '../../assets/avatar.png'; 
import axios from 'axios'

const PatientAppointmentCard = (props) => {

  const [appointment, setAppointment] = useState({});
  const [docData, setdocData] = useState([]);


  useEffect(() => {
    const fetchappointment= async () => {
      try {
        const response = await axios.get(`http://localhost:3000/appointment/getAppointment/${props.appId}`); 
        setAppointment(response.data);
        
        const doctor = await axios.get(`http://localhost:3000/doctor/${props.docId}`);
        setdocData(doctor.data[0]);

      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchappointment();
  }, []);
  console.log(docData,appointment);

  return (
    <>
      <div className="container-box-card container m-2 b-1 w-75 ">
      
        <div className="row p-5 align-items-center justify-content-center">
          <div className="col-sm-3 d-flex justify-content-center align-items-center">
            <img src={image} className="rounded-circle" alt="Avatar" width="100" height="100"/>
          </div>
          <div className="col d-flex flex-column gap-4">
            <div className="row">
              <div className="col">{docData.full_name}</div>
            </div>
            <div className="row d-flex justify-content-between">
               <div className="col">Specialization  : {docData.specialization} </div>
            </div>
            <div className="row d-flex justify-content-between">
               <div className="col">Time  : {appointment.startTime}  to  {appointment.closedTime}</div>
            </div>

            <div className="col-sm-3 d-flex "><button className="btn btn-danger">Cancel</button></div>

          </div>
        </div>
        </div>
    </>
  );
};

export default PatientAppointmentCard;
