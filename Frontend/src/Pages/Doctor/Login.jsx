import React from 'react'
import {Link} from 'react-router-dom'

const Login = () => {
  return (
    <div className='container d-flex flex-column align-items-center justify-content-center py-5'>
        <h2>Login as a Doctor</h2>
        <form className='d-flex flex-column w-50 gap-2 '>
            <label>Email</label>
            <input type="email" placeholder='Enter your email' className="form-control"></input>

            <label>Password</label>
            <input type="password" placeholder='Enter your password' className="form-control"></input>
            <button>Login</button>
        </form>
        <p className='py-2'>Not a Member? <Link to='../doctor/register'>Sign Up</Link></p>
        
    </div>
  )
}

export default Login