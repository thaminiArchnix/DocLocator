import React from 'react';
import image from '../../assets/avatar.png'; 

const PatientAppointmentCard = (props) => {
  return (
    <>
      <div className="container-box-card container m-2 b-1 w-75 ">
      
        <div className="row p-5 align-items-center justify-content-center">
          <div className="col-sm-3 d-flex justify-content-center align-items-center">
            <img src={image} className="rounded-circle" alt="Avatar" width="100" height="100"/>
          </div>
          <div className="col d-flex flex-column gap-4">
            <div className="row">
              <div className="col">{props.name}</div>
              <div className="col">{props.age} years</div>
              <div className="col">{props.gender}</div>
            </div>
            <div className="row d-flex justify-content-between">
              <div className="col">{props.startTime} to {props.endTime}</div>
              <div className="col-sm-3 d-flex justify-content-end"><button className="btn btn-danger">Cancel</button></div>
            </div>
            <div className="row"><div className="col">{props.location} <i className="bi bi-box-arrow-up-right p-2"></i></div></div>
          </div>
        </div>
        </div>
    </>
  );
};

export default PatientAppointmentCard;
