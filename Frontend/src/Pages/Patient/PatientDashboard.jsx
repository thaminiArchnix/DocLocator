import React, { useState } from 'react';
import PatientNavbarContainer from '../../Components/Patient/PatientNavbarContainer';
import app from '../../assets/app.jpg';
import '../../Components/Patient/patient.css';
import PatientAppointmentCard from '../../Components/Patient/PatientAppointmentCard';
//import PatientDashTodayCard from '../../Components/Patient/PatientDashTodayCard';
//import PatientDashOngoingCard from '../../Components/Patient/PatientDashOngoingCard';



const PatientDashboard = () => {

  const [specialization, setSpecialization] = useState('');
  const [disease, setDisease] = useState('');
  const [radius, setRadius] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [nearestDoctors, setNearestDoctors] = useState([]);

  // Function to calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers

    return distance;
  };

  // Function to convert degrees to radians
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch all doctors
      const allDoctorsResponse = await fetch('http://localhost:3000/doctor');
      const allDoctorsData = await allDoctorsResponse.json();

      // Calculate distances and filter by radius
      const doctorsWithinRadius = allDoctorsData.filter((doctor) => {
        const distance = calculateDistance(
          parseFloat(doctor.latitude),
          parseFloat(doctor.longitude)
        );

        return distance <= parseFloat(radius);
      });

      setNearestDoctors(doctorsWithinRadius);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };


  return (
    <div className='d-block'>
      <div><PatientNavbarContainer/></div>
      <h5 className='p-2'>Hello, Neha Gunasekara</h5>
      <div className='row-sm-11 d-flex flex-wrap align-items-center jistify-content-center'>
        <div className="col-sm-6 text-justify p-5"><p>What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div>
        <div className="col-sm-5 d-flex align-items-center justify-content-center"><img src={app} /></div>
      </div>
      <div className='d-flex justify-content-center gap-3 pt-5 flex-wrap'>
        <div className="col-sm-8 p-0 d-flex flex-column gap-2 ">
          <div className="row p-5 bg-dark-subtle rounded">
            <h3 className='p-1 text-center'>Find Your Doctor</h3><br></br>
              <section className="text-center">
                <div className="row">
                  <div className="col-lg-5">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12094.57348593182!2d-74.00599512526003!3d40.72586666928451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598f988156a9%3A0xd54629bdf9d61d68!2sBroadway-Lafayette%20St!5e0!3m2!1spl!2spl!4v1624523797308!5m2!1spl!2spl"
                      className="h-100 w-100" style={{ border: '0' }} allowFullScreen="" loading="lazy"
                    ></iframe>
                    <label className="form-label" htmlFor="form3Example1">Select Current Location</label>
                  </div>
                  <div className="col-lg-7">
                   {/*} <form onSubmit={handleSearchSubmit}>
                      <div className="row">
                        <div className="col-md-9">
                          <div className="row mb-4">
                            <div className="col-md-6 mb-4 mb-md-0">
                              <div className="form-outline">
                                <input type="text" id="form3Example1" className="form-control" />
                                <label className="form-label" htmlFor="form3Example1">Specialization</label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-outline">
                                <input type="number" id="form3Example2" className="form-control" />
                                <label className="form-label" htmlFor="form3Example2">Radius</label>
                              </div>
                            </div>
                          </div>
                          <div className="text-center text-md-start">
                            <button type="submit" className="btn btn-primary mb-5 mb-md-0">
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
  </form>{*/}
                  <form onSubmit={handleSearchSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="specialization" className="form-label">Specialization</label>
                        <input type="text" className="form-control" id="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="radius" className="form-label">Radius (in kilometers)</label>
                        <input type="number" className="form-control" id="radius" value={radius} onChange={(e) => setRadius(e.target.value)} />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="disease" className="form-label">Disease</label>
                        <input type="text" className="form-control" id="disease" value={disease} onChange={(e) => setDisease(e.target.value )} />
                      </div>
                    </div>
                    <div className="text-center text-md-start">
                      <button type="submit" className="btn btn-primary mb-5 mb-md-0">Search</button>
                    </div>
                  </form>

                    {nearestDoctors.length > 0 && <NearestDoctorsList doctors={nearestDoctors} />}
    
                  </div>
                </div>
              </section>     
          </div>
          <div className="row p-5 bg-dark-subtle rounded">
            <h3 className='p-1 text-center'>Ongoing Appointment</h3>
            <div className='p-2'>
              <center><PatientAppointmentCard/></center>
          </div>
          </div>
        </div>
      </div>
      
    </div>
    
  )
}

export default PatientDashboard