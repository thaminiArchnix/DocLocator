import React, {useState, useEffect} from 'react'
import NavbarContainer from '../../Components/Doctor/NavbarContainer'
import HistoryDay from '../../Components/Doctor/HistoryDay'
import '../../Components/Doctor/doctor.css'
import axios from 'axios'
import { useDoctor } from '../../context/DoctorContext'

const History = () => {
  const {userData} = useDoctor();
  const [appointments, setAppointments] = useState([]);
  const [completedApps, setCompletedApps] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/app');
        const apps = Object.values(response.data).filter(app => app.docId == userData.user.id);
        const completedAppointments = Object.values(apps).filter(app => app.status == "Completed" || app.status == "Canceled");
        setCompletedApps(completedAppointments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, []);

  const getUniqueDates = (apps) => {
    const uniqueDates = [];

    apps.forEach(app => {
      if (!uniqueDates.includes(app.date) && app.date !== undefined) {
            uniqueDates.push(app.date);
        };
    });
    return uniqueDates;
  };

  const dates = getUniqueDates(completedApps);


  return (
    <div>
      <div><NavbarContainer/></div>
      <div>
        {dates.map(date => (<HistoryDay key={dates.indexOf(date)} date={date}/>))}
      </div>
    </div>
  )
}

export default History