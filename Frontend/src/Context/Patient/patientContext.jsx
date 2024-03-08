
/*import { createContext, useContext, useState, useEffect } from 'react';

export const PatientContext = createContext();

export const usePatient = () => useContext(PatientContext);

export const PatientContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : null;
  });
  

  useEffect(() => {
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
  }, [userData]);
  

  const updateUser = (data) => {
    setUserData(prevState => ({
      ...prevState,
      user: data 
    }));
  };
  

  const logout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  };

  return (
    <PatientContext.Provider value={{ userData, updateUser, logout }}>
      {children}
    </PatientContext.Provider>
  );
};*/

// patientContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

export const PatientContext = createContext();

export const usePatient = () => useContext(PatientContext);

export const PatientContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : null;
  });

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  const updateUser = (data) => {
    setUserData(prevState => ({
      ...prevState,
      user: data 
    }));
  };

  const logout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  };

  return (
    <PatientContext.Provider value={{ userData, updateUser, logout }}>
      {children}
    </PatientContext.Provider>
  );
};
