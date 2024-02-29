
import { createContext, useContext, useState } from 'react';

const DoctorContext = createContext();

export const useDoctor = () => useContext(DoctorContext);

export const DoctorContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const updateUser = (data) => {
    setUserData(data);

  };

  return (
    <DoctorContext.Provider value={{ userData, updateUser }}>
      {children}
    </DoctorContext.Provider>
  );
};
