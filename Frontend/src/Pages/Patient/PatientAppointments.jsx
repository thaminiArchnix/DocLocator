import React from 'react'
import PatientNavbarContainer from '../../Components/Patient/PatientNavbarContainer'
import PatientAppointmentDay from '../../Components/Patient/PatientAppointmentDay'

const PatientAppointments = () => {
  return (
    <div>
      <div><PatientNavbarContainer/></div>
      <div>
        <PatientAppointmentDay date="20 February 2024"/>
        <PatientAppointmentDay date="21 February 2024"/>
      </div>
      </div>
  )
}

export default PatientAppointments