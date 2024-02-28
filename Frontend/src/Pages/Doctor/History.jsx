import React from 'react'
import NavbarContainer from '../../Components/Doctor/NavbarContainer'
import HistoryDay from '../../Components/Doctor/HistoryDay'
import '../../Components/Doctor/doctor.css'

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