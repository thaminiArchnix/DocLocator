import React, { useState, useEffect } from "react";
import NavbarContainer from "../../Components/Doctor/NavbarContainer";
import axios from "axios";
import Day from "../../Components/Doctor/Day";
import { auth } from "../../Middleware/auth";
import Unauthorized from "../../Components/Doctor/Unauthorized";
import { useDoctor } from "../../context/DoctorContext";
import Loading from "../../Components/Doctor/Loading";

const Appointments = () => {
  const { userData } = useDoctor();
  const [appointments, setAppointments] = useState([]);
  const [authorization, setAuthorization] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/app");
        setAppointments(response.data);
        const authData = await auth(userData.user.token, userData.user.email);
        setAuthorization(authData);
      } catch (error) {
        console.error(error);
        alert(`${error.request.response}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getUniqueDates = (apps) => {
    const uniqueDates = [];

    apps.forEach((app) => {
      if (!uniqueDates.includes(app.date) && app.date !== undefined) {
        uniqueDates.push(app.date);
      }
    });
    return uniqueDates;
  };

  const appArray = Object.values(appointments);
  const dates = getUniqueDates(appArray);

  return (
    <>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : authorization ? (
        <div>
          <div>
            <NavbarContainer />
          </div>
          {dates
            .sort((a, b) => new Date(b) - new Date(a))
            .map((date) => (
              <Day key={dates.indexOf(date)} date={date} dt={"app"} />
            ))}
        </div>
      ) : (
        <Unauthorized />
      )}
    </>
  );
};

export default Appointments;
