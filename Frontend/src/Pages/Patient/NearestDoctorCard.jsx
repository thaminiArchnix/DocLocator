import React, { useEffect, useState } from 'react';
import fdoc from '../../assets/fdoc.png';
import mdoc from '../../assets/mdoc.png';
import axios from 'axios';
import { Link } from 'react-router-dom';


const NearestDoctorCard = (props) => {
  const [docData, setDocData] = useState([]);
  const { doctor, onSelectDoctor } = props;
  console.log(props.doctor.id);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/doctor/${props.doctor.id}`);
        console.log(response);
        setDocData(response.data[0]);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctorData();
  }, [doctor.id]);

  const handleSelectDoctor = () => {
    onSelectDoctor(doctor.id);
  };
  console.log(docData);
  return (
    <div className="container-box-card container m-2 b-1 w-95 ">
        <div className="row p-3 align-items-center justify-content-center">
          <div className="col-sm-3 d-flex justify-content-center align-items-center">
            <img src={docData.gender === 'female' ? fdoc : mdoc} className="rounded-circle" alt="Avatar" width="100" height="100" />
          </div>
          <div className="col d-flex flex-column gap-4">
            <div className="row">
              <div className="col">{docData.full_name}</div>
            </div>
            <div className="row d-flex justify-content-between">
              <div className="col">Specialization: {docData.specialization}</div>
            </div>

     
            <div className="col-sm-3 d-flex ">
              <Link to={`/appointment/MakeAppointment?docId=${props.id}`} className="btn btn-primary" onClick={handleSelectDoctor} >
                Make Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default NearestDoctorCard;
