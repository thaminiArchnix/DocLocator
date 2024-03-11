import React, { useState , useEffect } from 'react';
import image from '../../assets/avatar.png'; 
import axios from 'axios'

const NearestDoctorCard = (props) => {


  const [docData, setdocData] = useState([]);
 


  useEffect(() => {
    const fetchdoctors = async () => {
      try {
        const doctor = await axios.get(`http://localhost:3000/doctor/${props.id}`);
        console.log(props.id);
        console.log(doctor);
        setdocData(doctor.data[0]); // Update this line
  
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
  
    fetchdoctors();
  }, []);
  
  console.log(docData);

  return (
    <>
      <div className="container-box-card container m-2 b-1 w-95 ">
      
        <div className="row p-3 align-items-center justify-content-center">
          <div className="col-sm-3 d-flex justify-content-center align-items-center">
            <img src={image} className="rounded-circle" alt="Avatar" width="100" height="100"/>
          </div>
          <div className="col d-flex flex-column gap-4">
            <div className="row">
              <div className="col">{docData.full_name}</div>
            </div>
            <div className="row d-flex justify-content-between">
               <div className="col">Specialization  : {docData.specialization} </div>
            </div>

            <div className="col-sm-3 d-flex "><button className="btn btn-primary">Make Appointment</button><Link to='../appointmnet/MakeAppointment'></Link>
</div>

          </div>
        </div>
        </div>
    </>
  );
};

export default NearestDoctorCard;
