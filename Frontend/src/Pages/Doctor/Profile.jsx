import React, { useEffect, useState } from "react";
import NavbarContainer from "../../Components/Doctor/NavbarContainer";
import mdoc from "../../assets/mdoc.png";
import fdoc from "../../assets/fdoc.png";
import { useDoctor } from "../../context/DoctorContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Map from "../../Components/Doctor/Map.jsx";
import { dateConverter } from "../../Middleware/dateConverter.js";
import Unauthorized from "../../Components/Doctor/Unauthorized.jsx";
import { auth } from "../../Middleware/auth.js";
import Loading from "../../Components/Doctor/Loading.jsx";

const Profile = () => {
  const { userData, logout } = useDoctor();
  const [doctor, setDoctor] = useState(); //Update functionality moved
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [authorization, setAuthorization] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate("../doctor/update");
  };

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const authData = await auth(userData.user.token, userData.user.email);
        setAuthorization(authData);
        setDoctor(userData.user);
      } catch (error) {
        console.error(error);
        alert(`${error.request.response}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAuth();
  }, [userData]);

  const handleRemove = () => {
    try {
      setDeleteMsg(true);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNow = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.user.token}`,
        },
      };
      const response = await axios.delete(
        `http://localhost:3000/doctor/${userData.user.id}`,
        config
      );
      console.log(userData.user.token);
      logout();
      navigate("../doctor/register");
    } catch (error) {
      console.error(error);
      alert(`${error.request.response}`);
    }
  };

  //const dateOfBirth = dateConverter(userData.user.date_of_birth);
  console.log(authorization);
  return (
    <>
      {loading ? (
        <Loading />
      ) : authorization ? (
        <div>
          <div>
            <NavbarContainer />
          </div>
          <div className="d-flex">
            <div className="col-sm-5 p-1 pt-5 d-flex flex-column gap-4 align-items-center">
              <img
                src={
                  doctor.gender == "Female" || doctor.gender == "female"
                    ? fdoc
                    : mdoc
                }
                width="300px"
                height="300px"
                className="rounded-circle"
              />
              <button
                className="bg-success btn btn-success"
                onClick={handleUpdate}
              >
                Update Profile
              </button>
              <button
                className="text-white btn btn-danger"
                onClick={handleRemove}
              >
                Remove Account
              </button>
            </div>
            <div
              className={
                deleteMsg
                  ? "custom-alert rounded d-flex flex-column gap-2 justify-content-center align-items-center"
                  : "hidden"
              }
            >
              Delete Now
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
                <p>{doctor.full_name}</p>
              </div>
              <div className="row">
                <h6>Email</h6>
                <p>{doctor.email}</p>
              </div>
              <div className="row">
                <h6>Date of Birth</h6>
                <p>{dateConverter(userData.user.date_of_birth)}</p>
              </div>
              <div className="row">
                <h6>Password</h6>
                <p>{"*".repeat(doctor.password)}</p>
              </div>
              <div className="row">
                <h6>Phone</h6>
                <p>{doctor.phone_number}</p>
              </div>
              <div className="row">
                <h6>Specialization</h6>
                <p>{doctor.specialization}</p>
              </div>
              <div className="row">
                <h6>Gender</h6>
                <p>{doctor.gender}</p>
              </div>
              <div className="row">
                <h6>Location</h6>
                <Map
                  longitude={parseFloat(userData.user.longitude)}
                  latitude={parseFloat(userData.user.latitude)}
                  id={`doc${doctor.id}`}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Unauthorized />
      )}
    </>
  );
};

export default Profile;
