import React from 'react'
import image from '../../assets/avatar.png';
import './doctor.css'

const HistoryCard = (props) => {
  return (
    <>
      <div className="container-box container m-2 b-1 history w-50">
        <div className="row p-3 align-items-center justify-content-center">
          <div className="col-sm-3 d-flex justify-content-center align-items-center">
            <img src={image} className="rounded-circle" alt="Avatar" width="100" height="100"/>
          </div>
          <div className="col d-flex flex-column gap-2">
            <div className="row d-flex flex-row flex-wrap">
              <div className="col">{props.name}</div>
              <div className="col">{props.age} years</div>
              <div className="col">{props.gender}</div>
            </div>
            <div className="row d-flex flex-wrap justify-content-between">
              <div className="col">{props.startTime} to {props.endTime}</div>
              <div className="col-sm-3 d-flex justify-content-end text-success">{props.status}</div>
            </div>
            <div className="row"><div className="col">{props.location} <i className="bi bi-box-arrow-up-right p-2"></i></div></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HistoryCard