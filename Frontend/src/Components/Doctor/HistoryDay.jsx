import React from 'react'
import HistoryCard from './HistoryCard'

const HistoryDay = (props) => {
  return (
    <div>
        <div className='p-2'>
            <h3 className='p-2 px-5'>{props.date}</h3>
            <div className='d-flex flex-wrap justify-content-center align-items-center'>
                <HistoryCard name="Shashika Abeygunawardene" age="32" gender="Female" startTime="11.30 a.m." endTime="12.30 p.m." location="123, Union Place, Colombo" status="Completed"/>
                <HistoryCard name="Jenny Carter" age="32" gender="Female" startTime="11.30 a.m." endTime="12.30 p.m." location="123, Union Place, Colombo" status="Completed"/>
                <HistoryCard name="Shashika Abeygunawardene" age="32" gender="Female" startTime="11.30 a.m." endTime="12.30 p.m." location="123, Union Place, Colombo" status="Completed"/>
                <HistoryCard name="Shashika Abeygunawardene" age="32" gender="Female" startTime="11.30 a.m." endTime="12.30 p.m." location="123, Union Place, Colombo" status="Completed"/>
            </div>
        </div>
    </div>
  )
}

export default HistoryDay