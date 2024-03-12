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
  const [onGoing, setOnGoing] = useState([]);
  const [pending, setPending] = useState([]);

  useEffect(() => {
    const fetchTodayAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/app/today/now/${userData.user.id}`);
        const todays = Object.values(response.data).filter(app => app.docId == userData.user.id);
        const pendingApps = todays.filter(app => app.status == "Pending");
        setPending(pendingApps);
        const onGoingApps = todays.filter(app => app.status == "OnGoing");
        setOnGoing(onGoingApps);
        
      } catch (error) {
        console.error('Error fetching today\'s appointments:', error);
      }
    };

    fetchTodayAppointments();
  }, []);
  console.log(pending, onGoing);
 
  return (
    <div className='d-block'>
      <div><NavbarContainer/></div>
      <h5 className='p-5'>Hello, Dr. {userData.user.full_name}</h5>
      
      <div className='row-sm-11 d-flex flex-wrap align-items-center jistify-content-center'>
        <div className="col-sm-6 text-center p-5"><h6>Welcome to DocLocator?!</h6> <p>
        Whether you're in the clinic, at home, or on the go, use DocLocator to make informed decisions and deliver personalized care. Join our community of healthcare professionals dedicated to excellence and innovation. Together, let's shape the future of medicine and transform healthcare delivery for the better.</p></div>
        <div className="col-sm-5 d-flex align-items-center justify-content-center"><img src={doctorImage} width='300' height='300'/></div>
      </div>
      <div className='d-flex justify-content-center gap-3 pt-5 flex-wrap'>
        <div className="col-sm-8 p-0 d-flex flex-column gap-2 ">
          <div className="row p-5 bg-dark-subtle rounded">
            <h3 className='p-1 text-center'>Ongoing Appointment</h3>
            <div className='p-2'>
              {onGoing.map(app => (<DashOngoingCard key={onGoing.indexOf(app)} patientId={app.patientId} appId={app.appId}/>))}
            </div>
          </div>
          <div className="row p-5 bg-dark-subtle rounded">
            <h3 className='p-1 text-center'>Upcoming Appointments</h3>
            <div>
            {pending.map(app => (
              <DashTodaysCard key={pending.indexOf(app)} patientId={app.patientId} appId={app.appId}/>
            ))}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard