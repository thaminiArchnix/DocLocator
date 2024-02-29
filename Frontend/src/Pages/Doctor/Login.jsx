import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useDoctor} from '../../context/DoctorContext.jsx'
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const [formData, setFormData] = useState({
    email : '',
    password : ''
  })
  const {email, password} = formData;
  const navigate =  useNavigate();
  const { updateUser } = useDoctor();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
        email: email,
        password: password
    };

    try {
        const response = await axios.post('http://localhost:3000/doctor/login', userData);
        const userDoctor = response.data[0];
        updateUser(userDoctor);
        
        navigate('../doctor/profile');

    } catch (error) {
        console.error('Error logging in:', error);
    }
};
  


  return (
    <div className='container d-flex flex-column align-items-center justify-content-center py-5'>
        <h2>Login as a Doctor</h2>
        <form className='d-flex flex-column w-50 gap-2 ' onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" placeholder='Enter your email' name="email" className="form-control" value={email} onChange={onChange}></input>

            <label>Password</label>
            <input type="password" placeholder='Enter your password' name="password" className="form-control" value={password} onChange={onChange}></input>
            <button type='submit'>Login</button>
        </form>
        <p className='py-2'>Not a Member? <Link to='../doctor/register'>Sign Up</Link></p>
        
    </div>
  )
}

export default Login