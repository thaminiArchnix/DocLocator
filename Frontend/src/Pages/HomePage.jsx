import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
        <center>
        <h3>Login</h3>

      <p className='py-2'>Are You a Doctor? <Link to='../doctor/login'>Login</Link></p>
      <p className='py-2'>Are you a Patient? <Link to='../patient/login'>Login</Link></p>

        </center>
      
    </div>
  )
}

export default HomePage
