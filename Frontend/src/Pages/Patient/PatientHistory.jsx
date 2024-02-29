import React from 'react'
import NavbarContainer from '../../Components/Patient/PatientNavbarContainer'
import HistoryDay from '../../Components/Patient/PatientHistoryDay'
import '../../Components/Patient/patient.css'

const History = () => {
  return (
    <div>
      <div><NavbarContainer/></div>
      <div>
        <HistoryDay date="20 February 2024"/>
        <HistoryDay date="21 February 2024"/>
      </div>
    </div>
  )
}

export default History