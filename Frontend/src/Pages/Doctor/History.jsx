import React, { useState, useEffect } from "react";
import NavbarContainer from "../../Components/Doctor/NavbarContainer";
import "../../Components/Doctor/doctor.css";
import axios from "axios";
import { useDoctor } from "../../context/DoctorContext";
import Day from "../../Components/Doctor/Day";
import { auth } from "../../Middleware/auth";
import Unauthorized from "../../Components/Doctor/Unauthorized";
import Loading from "../../Components/Doctor/Loading";
//import { useNavigate } from "react-router-dom";

const History = () => {
  //const navigate = useNavigate();
  const { userData } = useDoctor();
  const [completedApps, setCompletedApps] = useState([]);
  const [authorization, setAuthorization] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/app");
        const apps = Object.values(response.data).filter(
          (app) => app.docId == userData.user.id
        );
        const completedAppointments = Object.values(apps).filter(
          (app) => app.status == "Completed"
        );
        setCompletedApps(completedAppointments);
        const authData = await auth(userData.user.token, userData.user.email);
        console.log(authData);
        setAuthorization(authData);

        // if (authData === true) {
        //   setAuthorization(true);
        // } else {
        //   setAuthorization(false);
        //   alert("You are unauthorized! Please Login");
        //   navigate("../doctor/login");
        // }
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

  const dates = getUniqueDates(completedApps);
  console.log(authorization);

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
          <div>
            {dates
              .sort((a, b) => new Date(b) - new Date(a))
              .map((date) => (
                <Day key={dates.indexOf(date)} date={date} dt={"his"} />
              ))}
          </div>
        </div>
      ) : (
        <Unauthorized />
      )}
    </>
  );
};

export default History;
