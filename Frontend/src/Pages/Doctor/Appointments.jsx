import React from 'react'
import NavbarContainer from '../../Components/Doctor/NavbarContainer'
import AppointmentDay from '../../Components/Doctor/AppointmentDay'

const Appointments = () => {
  return (
    <div>
      <div><NavbarContainer/></div>
      <div>
        <AppointmentDay date="20 February 2024"/>
        <AppointmentDay date="21 February 2024"/>
      </div>
      </div>
  )
}

export default Appointments