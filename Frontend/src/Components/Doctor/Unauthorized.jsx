import React from "react";
import { useNavigate } from "react-router-dom";
const Unauthorized = () => {
  const navigate = useNavigate();
  const handleUnAuth = () => {
    navigate("../doctor/login");
  };
  return (
    <div className="d-block bg-danger text-white d-flex flex-column justify-content-center align-items-center p-5 my-5">
      <p className="p-5">Please Login to access your account</p>{" "}
      <button className="btn btn-dark" onClick={handleUnAuth}>
        {" "}
        Go to Login Page
      </button>{" "}
    </div>
  );
};

export default Unauthorized;
