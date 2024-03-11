import React from 'react';
import NearestDoctorCard from './NearestDoctorCard';

const NearestDoctorsList = (props) => {
  const doctors = Object.values(props);

  console.log(doctors[0]);
  return (
    <>
      {doctors[0].map((doctor) => (
        <NearestDoctorCard key={doctor.id} id={doctor.id}/>
      ))}
    </>
  );
};

export default NearestDoctorsList;
