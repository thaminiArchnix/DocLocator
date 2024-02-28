import React from 'react'
import NavbarContainer from '../../Components/Doctor/NavbarContainer'
import AppointmentDay from '../../Components/Doctor/AppointmentDay'

const Appointments = () => {
  return (
    <div>
      <div><NavbarContainer/></div>
      <div>
        <AppointmentDay date="20th February 2024"/>
        <AppointmentDay date="21th February 2024"/>
      </div>
      </div>
  )
}

export default Appointments