import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientNavbarContainer from "../../Components/Patient/PatientNavbarContainer";
import PatientAppointmentCard from "../../Components/Patient/PatientAppointmentCard";
import { usePatient } from "../../context/Patient/patientContext";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientNavbarContainer from "../../Components/Patient/PatientNavbarContainer";
import PatientAppointmentCard from "../../Components/Patient/PatientAppointmentCard";
import { usePatient } from "../../context/Patient/patientContext";
import "../../Components/Patient/patient.css";

const PatientMyAppointments = () => {
  const { userData } = usePatient();
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (userData) {
          const allAppointmentsResponse = await axios.get(
            `http://localhost:3000/app/`
          );
          const allAppointmentsData = allAppointmentsResponse.data;

          const filteredAppointments = Object.values(
            allAppointmentsData
          ).filter(
            (appointment) =>
              appointment.patientId === userData.user[0].PatientId &&
              (statusFilter === "" || appointment.status === statusFilter)
          );

          setAppointments(filteredAppointments);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [userData, statusFilter]);

  return (
    <>
      <div>
        <PatientNavbarContainer />
      </div>
      <div className="filter-container">
        <div className="filter-dropdown">
          <label htmlFor="statusFilter">Filter by Status </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Canceled">Canceled</option>
            <option value="Missed">Missed</option>
            <option value="OnGoing">OnGoing</option>
          </select>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
        {appointments.map((appointment) => (
          <PatientAppointmentCard
            key={appointment.appId}
            appId={appointment.appId}
            docId={appointment.docId}
          />
        ))}
      </div>
    </>
  );
};

export default PatientMyAppointments;
