import { createContext, useContext, useState, useEffect } from "react";

export const DoctorContext = createContext();

export const useDoctor = () => useContext(DoctorContext);

export const DoctorContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : null;
  });

  useEffect(() => {
    // Store user data in local storage whenever userData changes
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  const updateUser = (data) => {
    setUserData((prevState) => ({
      ...prevState,
      user: data, // Update the 'user' property with the new data
    }));
  };

  const logout = () => {
    //setUserData(null);
    localStorage.removeItem("userData");
    //updateUser(null);

    localStorage.removeItem("token");
  };

  return (
    <DoctorContext.Provider value={{ userData, updateUser, logout }}>
      {children}
    </DoctorContext.Provider>
  );
};
