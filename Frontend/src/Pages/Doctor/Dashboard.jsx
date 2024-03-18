import React, { useEffect, useState } from 'react'
import NavbarContainer from '../../Components/Doctor/NavbarContainer'
import doctorImage from '../../assets/doctor.png'
import '../../Components/Doctor/doctor.css'
import { useDoctor } from '../../context/DoctorContext'
import axios from 'axios'
import { calculateEndTime } from '../../Middleware/calculateEndTime'
import Appointment from '../../Components/Doctor/Appointment'

const Dashboard = () => {
  const { userData } = useDoctor();
  const [onGoing, setOnGoing] = useState([]);
  const [pending, setPending] = useState([]);
  const [startApp, setStartApp] = useState(false);
  const [missed, setMissed] = useState(false);

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
        alert(`${error.request.response}`);
      }
    };

    fetchTodayAppointments();
  }, []);

  useEffect(() => {
    const checkAppointmentTime = async () => {
      const currentTime = new Date();
      const currentTimeString = `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}:${currentTime.getSeconds().toString().padStart(2, '0')}`;
      for (const app of pending) {
        //const appTime = new Date(app.startTime);
        //console.log(app.startTime, appTime, currentTime);
        // if (currentTime > appTime) {
        //   console.log('You are here!', app, currentTime, appTime);
        // }
        const endTime = calculateEndTime(app.startTime);
        //if (app.StartTime > currentTimeString) {}
        //console.log(app.startTime, endTime, currentTimeString);
        if (app.startTime === currentTimeString && app.status == "Pending") {
          //console.log('executed');
          setStartApp(true);
        }
        
        if (endTime === currentTimeString && app.status == "Pending") {
          const data = {
            "status": "Missed"
          }
          try {
            //console.log(data);
            const response = await axios.put(`http://localhost:3000/app/${app.appId}`, data);
            setMissed(true);
          } catch (error) {
            console.error(error);
            alert(`${error.request.response}`);
          }
        }
      }
    };

    const intervalId = setInterval(checkAppointmentTime, 1000); // Check every second
    return () => clearInterval(intervalId);
  }, [pending]);
  
  const handleMissed = () => {
    setMissed(false);
    window.location.reload();
  }
 
  return (
    <div className='d-block'>
      <div><NavbarContainer/></div>
      <h5 className='p-5'>Hello, Dr. {userData.user.full_name}</h5>
      {startApp && <div className="text-white bg-danger p-3">It is time for your appointment. Press Start to Begin!</div>}
      {missed && <div className="d-flex align-items-center justify-content-center flex-row text-white bg-danger p-3">You missed an appointment! <button className='m-3 btn btn-outline-light' onClick={handleMissed}>Ok</button></div>}
      <div className='row-sm-11 d-flex flex-wrap align-items-center justify-content-center'>
        <div className="col-sm-6 text-center p-5"><h6>Welcome to DocLocator!</h6> <p>
        Whether you're in the clinic, at home, or on the go, use DocLocator to make informed decisions and deliver personalized care. Join our community of healthcare professionals dedicated to excellence and innovation. Together, let's shape the future of medicine and transform healthcare delivery for the better.</p></div>
        <div className="col-sm-5 d-flex align-items-center justify-content-center"><img src={doctorImage} width='300' height='300'/></div>
      </div>
      <div className='d-flex justify-content-center gap-3 pt-5 flex-wrap'>
        <div className="col-sm-8 p-0 d-flex flex-column gap-2 ">
          <div className="row p-5 bg-dark-subtle rounded">
            <h3 className='p-1 text-center'>Ongoing Appointment</h3>
            <div className='d-flex flex-column align-items-center justify-content-center p-2'>
              {onGoing.map(app => (<Appointment key={onGoing.indexOf(app)} patId={app.patientId} appId={app.appId}/>))}
            </div>
          </div>
          <div className="row p-5 bg-dark-subtle rounded">
            <h3 className='p-1 text-center'>Upcoming Appointments</h3>
            <div className='d-flex flex-column align-items-center justify-content-center p-2'>
            {pending ? pending.map(app => (
              <Appointment key={pending.indexOf(app)} patId={app.patientId} appId={app.appId} today={true}/>
            )) : 'No pending'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard