import React from 'react';
import './patient.css';

const CustomAlert = ({ type, message, onClose }) => {
  return (
    <div className={`custom-alert-box ${type}`}>
      <span className="close-btn" onClick={onClose}>&times;</span>
      {message}
    </div>
  );
};

export default CustomAlert;
