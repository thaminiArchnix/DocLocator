import React from 'react'
import image from '../../assets/avatar.png'; 

const PatientDashOngoingCard = (props) => {
  return (
    <>
    <div className="container-box container m-2 b-1 w-100 bg-info-subtle text-dark">
      <div className="row p-3 align-items-center justify-content-center">
      <div className="col-sm-3 d-flex justify-content-center align-items-center">
        <img src={image} className="rounded-circle" alt="Avatar" width="100" height="100"/>
      </div>
        <div className="col d-flex flex-column gap-2">
          <div className="row">
            <div className="col">{props.name}</div>
            <div className="col">{props.age} years</div>
            <div className="col">{props.specialization}</div>
          </div>
          <div className="row d-flex justify-content-between">
            <div className="col">{props.startTime} to {props.endTime}</div>
            <div className="col-sm-3 d-flex flex-wrap gap-3 justify-content-end"><button>Cancel</button></div>
          </div>
          <div className="row">
              <div className="col">{props.location} <i class="bi bi-box-arrow-up-right p-2"></i></div>
              
          
          </div>
          <div className="row"><button className='bg-success'>Completed</button></div>
        </div>
      </div>
    </div>
  </>
  )
}

export default PatientDashOngoingCard