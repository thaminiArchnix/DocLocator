import React, { useState } from 'react';
import '../../index.css'

const CustomAlert = ({ message, onClose, Button }) => {
  return (
    <div className="custom-alert">
      <p>{message}</p>
      <button onClick={onClose}>{Button}</button>
    </div>
  );
};

const Alert = () => {
  const [showAlert, setShowAlert] = useState(false);

  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };

  return (
    <div>
      <h1>Custom Alert Example</h1>
      <button onClick={toggleAlert}>Show Alert</button>
      {showAlert && (
        <CustomAlert message="This is a custom alert message!" onClose={toggleAlert} />
      )}
    </div>
  );
}

export default Alert