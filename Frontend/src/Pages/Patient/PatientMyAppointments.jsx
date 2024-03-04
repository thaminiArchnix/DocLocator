import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from '../../assets/avatar.png';

const PatientMyAppointments = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Fetch appointments for the current patient
        const response = await axios.get(`/api/appointments?patientId=${patientId}`);
        const appointmentsData = response.data;

        // Fetch doctor information for each appointment
        const appointmentsWithDoctorInfo = await Promise.all(
          appointmentsData.map(async (appointment) => {
            const doctorId = appointment.doctorId;
            const doctorResponse = await axios.get(`/api/doctors/${doctorId}`);
            const doctorData = doctorResponse.data;
            return { ...appointment, doctor: doctorData };
          })
        );

        setAppointments(appointmentsWithDoctorInfo);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [patientId]);

  return (
    <>
      {appointments.map((appointment) => (
        <div key={appointment.id} className="container-box-card container m-2 b-1 w-75">
          <div className="row p-5 align-items-center justify-content-center">
            <div className="col-sm-3 d-flex justify-content-center align-items-center">
              <img src={appointment.doctor?.profilePic || image} className="rounded-circle" alt="Doctor Avatar" width="100" height="100"/>
            </div>
            <div className="col d-flex flex-column gap-4">
              <div className="row">
                <div className="col">{appointment.doctor?.name}</div>
                <div className="col">{appointment.doctor?.specialization}</div>
              </div>
              <div className="row d-flex justify-content-between">
                <div className="col">{appointment.startTime} to {appointment.endTime}</div>
                <div className="col-sm-3 d-flex justify-content-end"><button className="btn btn-danger">Cancel</button></div>
              </div>
              <div className="row"><div className="col">{appointment.location} <i className="bi bi-box-arrow-up-right p-2"></i></div></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PatientMyAppointments;
