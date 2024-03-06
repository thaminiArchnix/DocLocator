import React, { useEffect, useState } from 'react'
import NavbarContainer from '../../Components/Doctor/NavbarContainer'
import doctorImage from '../../assets/doctor.png'
import '../../Components/Doctor/doctor.css'
import DashTodaysCard from '../../Components/Doctor/DashTodaysCard'
import DashOngoingCard from '../../Components/Doctor/DashOngoingCard'
import { useDoctor } from '../../context/DoctorContext'
import axios from 'axios'

const Dashboard = () => {
  const { userData } = useDoctor();
  const [today, setToday] = useState([]);

  useEffect(() => {
    const fetchTodayAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/app/today/now/${userData.user.id}`);
        const todays = Object.values(response.data).filter(app => app.docId == userData.user.id);
        setToday(todays); 
      } catch (error) {
        console.error('Error fetching today\'s appointments:', error);
      }
    };

    fetchTodayAppointments();
  }, []);

  
 
  return (
    <div className='d-block'>
      <div><NavbarContainer/></div>
      <h5 className='p-5'>Hello, Dr. {userData.user.full_name}</h5>
      
      <div className='row-sm-11 d-flex flex-wrap align-items-center jistify-content-center'>
        <div className="col-sm-6 text-center p-5"><p>What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div>
        <div className="col-sm-5 d-flex align-items-center justify-content-center"><img src={doctorImage} width='300' height='300'/></div>
      </div>
      <div className='d-flex justify-content-center gap-3 pt-5 flex-wrap'>
        <div className="col-sm-8 p-0 d-flex flex-column gap-2 ">
          <div className="row p-5 bg-dark-subtle rounded">
            <h3 className='p-1 text-center'>Ongoing Appointment</h3>
            <div className='p-2'>
              <DashOngoingCard name="Jenny Carter" age="32" gender="Female" startTime="11.30 a.m." endTime="12.30 p.m." location="123, Union Place, Colombo"/>
            </div>
          </div>
          <div className="row p-5 bg-dark-subtle rounded">
            <h3 className='p-1 text-center'>Today's Appointments</h3>
            <div>
            {today.map(app => (
              <DashTodaysCard key={today.indexOf(app)} patientId={app.docId}/> // change this to patientId
            ))}
            </div>
          </div>
        </div>
        <div className="col-sm-3 p-5 bg-dark-subtle text-center h-100 rounded">
          <h3 className='p-1'>Absences</h3>
          <div className="container">
            <div id="datepicker" className="input-group date" data-date-format="mm-dd-yyyy"> 
                <input className="form-control" type="date" readOnly /> 
            </div>
          </div>
          <div className="row p-3"><button className='bg-dark'>Add Date</button></div>
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard