
import React from 'react';

const AppointmentMap = ({ longitude, latitude, onClose }) => {
  return (
    <div>
      
      <p>Longitude: {longitude}</p>
      <p>Latitude: {latitude}</p>
      <button onClick={onClose}>Close Map</button>
    </div>
  );
};

export default AppointmentMap;
