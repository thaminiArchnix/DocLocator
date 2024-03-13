import React from 'react';
import NearestDoctorCard from './NearestDoctorCard';

const NearestDoctorsList = ({ doctors, onSelectDoctor }) => {
  return (
    <>
      {doctors.map((doctor) => (
        <NearestDoctorCard key={doctor.id} doctor={doctor} onSelectDoctor={onSelectDoctor} />
      ))}
    </>
  );
};

export default NearestDoctorsList;
