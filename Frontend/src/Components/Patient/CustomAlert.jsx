import React from 'react';
import './CustomAlert.css';

const CustomAlert = ({ type, message, onClose }) => {
  return (
    <div className={`custom-alert ${type}`}>
      <span className="close-btn" onClick={onClose}>&times;</span>
      {message}
    </div>
  );
};

export default CustomAlert;
