import React from 'react'
import AppointmentCard from './AppointmentCard'

const AppointmentDay = (props) => {
  return (
    <div className='p-2'>
        <h3 className='p-2'>{props.date}</h3>
        <div className='d-flex flex-column align-items-center'>
            <AppointmentCard name="Jenny Carter" age="32" gender="Female" startTime="11.30 a.m." endTime="12.30 p.m." location="123, Union Place, Colombo"/>
            <AppointmentCard name="Jenny Carter" age="32" gender="Female" startTime="11.30 a.m." endTime="12.30 p.m." location="123, Union Place, Colombo"/>
        </div>
    </div>
  )
}

export default AppointmentDay