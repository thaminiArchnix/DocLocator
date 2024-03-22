import React, { useState, useEffect } from "react";
import fpat from "../../assets/fpat.png";
import mpat from "../../assets/mpat.png";
import axios from "axios";
import Map from "../Doctor/Map.jsx";
import { calculateAge } from "../../Middleware/calculateAge.js";
import { calculateEndTime } from "../../Middleware/calculateEndTime.js";
import "./doctor.css";

const Appointment = (props) => {
  const [appointment, setAppointment] = useState({});
  const [patient, setPatient] = useState({});
  const [mapPopup, setMapPopup] = useState(false);
  const [status, setStatus] = useState("Pending");

  const [endTime, setEndTime] = useState();

  //set status of appointment
  useEffect(() => {
    setStatus(appointment.status);
  }, [appointment]);

  //fetch appointment and patient from database and set appointment and patient
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/app/${props.appId}`
        );
        setAppointment(response.data[0]);
        const patient = await axios.get(
          `http://localhost:3000/patient/getpatient/${props.patId}`
        );
        setPatient(patient.data[0]);
      } catch (error) {
        console.error(error);
        alert(`${error.request.response}`);
      }
    };
    fetchAppointments();
  }, []);

  //toggle the map's display
  const handleMap = () => {
    setMapPopup((prevMapPopup) => !prevMapPopup);
  };

  //when cancelled : update database and set status
  const handleCancel = async () => {
    const data = {
      status: "Canceled",
    };
    try {
      const response = await axios.put(
        `http://localhost:3000/app/${props.appId}`,
        data
      );
      setStatus("Canceled");
    } catch (error) {
      console.error(error);
      alert(`${error.request.response}`);
    }
  };

  //when completed : update database, set the status and reload the page.
  const handleCompleted = async () => {
    const data = {
      status: "Completed",
    };
    try {
      const response = await axios.put(
        `http://localhost:3000/app/${props.appId}`,
        data
      );
      setStatus("Completed");
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error(error);
      alert(`${error.request.response}`);
    }
  };

  //when canceled : remove from database
  const handleRemove = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/app/${props.appId}`
      );
      window.location.reload(); // Reload the page
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //when ongoing : set status and reload
  const handleStart = async () => {
    const data = {
      status: "OnGoing",
    };
    try {
      const response = await axios.put(
        `http://localhost:3000/app/${props.appId}`,
        data
      );
      setStatus("OnGoing");
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error(error);
      alert(`${error.request.response}`);
    }
  };

  //set end time of appointment
  useEffect(() => {
    setEndTime(calculateEndTime(appointment.startTime));
  }, [appointment]);

  //calculate age of patient from date of birth
  const age = calculateAge(patient.DOB);

  return (
    <>
      <div
        className={
          status === "Missed"
            ? "container-box container m-2 b-1 w-75 missed-card p-3"
            : status === "OnGoing"
            ? "ongoing container-box container m-2 b-1 w-75 p-3"
            : status === "Completed"
            ? "completed-card container-box container m-2 b-1 w-75 p-3"
            : "bg-white container-box container m-2 b-1 w-75 p-3"
        }
      >
        <div className="row p-3 align-items-center justify-content-center">
          <div className="col-sm-3 d-flex justify-content-center align-items-center">
            <img
              src={patient.Gender == "Female" ? fpat : mpat}
              className="rounded-circle"
              alt="Avatar"
              width="100"
              height="100"
            />
          </div>
          <div className="col d-flex flex-column gap-2">
            <div className="row">
              <div className="col">Name : {patient.Name}</div>
              <div className="col">Age : {age} years</div>
              <div className="col">Gender : {patient.Gender}</div>
              <div className="col-sm-3 d-flex justify-content-end">
                <button
                  className={`btn ${
                    status === "Canceled"
                      ? "btn-dark"
                      : status === "Missed"
                      ? "btn-dark"
                      : "hidden"
                  }`}
                  onClick={handleRemove}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="row d-flex justify-content-between">
              <div className="col bold">
                Time : {appointment.startTime} to {endTime}
              </div>
              <div
                className={
                  status === "Canceled"
                    ? "col text-danger"
                    : status === "Pending"
                    ? "col text-primary"
                    : status === "OnGoing"
                    ? "col text-warning"
                    : status === "Completed"
                    ? "col text-success"
                    : "col"
                }
              >
                Status : {status}
              </div>
              <div className="col-sm-3 d-flex justify-content-end">
                <button
                  className={`btn ${
                    status === "Canceled"
                      ? "hidden"
                      : status === "Missed"
                      ? "hidden"
                      : status === "Completed"
                      ? "hidden"
                      : "btn-primary"
                  }`}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
            <div>Phone : {patient.Phone}</div>
            <div>Patient Notes : {appointment.disease}</div>
            <div className="col cursor" onClick={handleMap}>
              {mapPopup ? "Close Map" : "Show Location"}{" "}
              <i className="bi bi-box-arrow-up-right p-2"></i>
            </div>
            <div className={mapPopup ? "" : "hidden"}>
              {mapPopup && (
                <Map
                  longitude={parseFloat(appointment.longitude)}
                  latitude={parseFloat(appointment.latitude)}
                  id={appointment.appId}
                />
              )}
            </div>
            {status === "OnGoing" && (
              <div className="row">
                <button className="btn btn-success" onClick={handleCompleted}>
                  Completed
                </button>
              </div>
            )}
            {props.today === true && (
              <div className="row">
                <button
                  className={`btn ${
                    status === "Canceled" ? "disabled" : "btn-warning"
                  }`}
                  onClick={handleStart}
                >
                  Start
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;
