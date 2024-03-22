import React from "react";
import { useState, useEffect } from "react";
import fpat from "../../assets/fpat.png";
import mpat from "../../assets/mpat.png";
import { usePatient } from "../../context/Patient/patientContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Map from "../../Components/Patient/LocationMap.jsx";
import PatientNavbarContainer from "../../Components/Patient/PatientNavbarContainer.jsx";
import ShowLocation from "../../Components/Patient/ShowLocation.jsx";
import { dateConverter } from "../../Middleware/dateConverter.js";

const PatientProfile = () => {
  const { userData, logout } = usePatient();
  const [patient, setPatient] = useState(userData.user);
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  console.log(userData.user[0]);

  const handleRemove = () => {
    try {
      setDeleteMsg(true);
    } catch (error) {}
  };

  const deleteNow = async () => {
    try {
      const appointmentsNow = await axios.get("http://localhost:3000/app/");

      const appsMade = await Object.values(appointmentsNow.data).filter(
        (app) =>
          app.patientId === userData.user[0].PatientId &&
          app.status !== "Completed" &&
          app.status !== "Canceled" &&
          app.status !== "Missed"
      );
      console.log(appsMade, appointmentsNow);
      if (appsMade == null || appsMade.length == 0) {
        const config = {
          headers: {
            Authorization: `Bearer ${userData.user.token}`,
          },
        };
        console.log("You can delete");
        const response = await axios.delete(
          `http://localhost:3000/patient/removepatient/${userData.user[0].PatientId}`,
          config
        );
        logout();
        navigate("../patient/regi");
      } else {
        console.error("Cannot delete account!");
        alert(
          "You can't delete your account with Pending and OnGoing Commitments!"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(userData.user[0].PatientId);

  const handleUpdate = () => {
    navigate("../patient/updateProfile");
  };

  return (
    <div>
      <div>
        <PatientNavbarContainer />
      </div>
      <div className="d-flex">
        <div className="col-sm-5 p-1 pt-5 d-flex flex-column gap-4 align-items-center">
          {patient && (
            <img
              src={patient[0].Gender === "Female" ? fpat : mpat}
              width="300px"
              height="300px"
              className="rounded-circle"
            />
          )}
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleUpdate}
          >
            Update Profile
          </button>
          <button
            type="button"
            className="btn btn-dark btn-lg"
            onClick={handleRemove}
          >
            Remove Profile
          </button>
        </div>
        <div
          className={
            deleteMsg
              ? "custom-alert rounded d-flex flex-column gap-2 justify-content-center align-items-center p-5"
              : "hidden"
          }
        >
          Are you sure you want to delete your account? This is an irreversible
          action.
          <button className="btn btn-dark" onClick={deleteNow}>
            Delete
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setDeleteMsg(false)}
          >
            No!
          </button>
        </div>

        <div className="col-sm-6 d-flex flex-column gap-2 py-5">
          <div className="row">
            <h6>Name</h6>
            <p>{patient[0].Name}</p>
          </div>
          <div className="row">
            <h6>Email</h6>
            <p>{patient[0].Email}</p>
          </div>
          <div className="row">
            <h6>Date of Birth</h6>
            <p>{dateConverter(patient[0].DOB) || patient[0].DOB}</p>
          </div>
          <div className="row">
            <h6>Password</h6>
            <p>{"*".repeat(patient.Password)}</p>
          </div>
          <div className="row">
            <h6>Phone</h6>
            <p>{patient[0].Phone}</p>
          </div>
          <div className="row">
            <h6>Location</h6>
            <ShowLocation
              longitude={parseFloat(userData.user[0].Longitude)}
              latitude={parseFloat(userData.user[0].Latitude)}
              id={`map${patient[0].PatientId}`}
              //setAddress={setAddress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
