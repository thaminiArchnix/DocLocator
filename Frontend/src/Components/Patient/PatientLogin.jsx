import React, { useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { usePatient } from '../../context/Patient/patientContext.jsx'
import { useNavigate } from 'react-router-dom';




const PatientLogin = () => {
  const [formData, setFormData] = useState({
    Email : '',
    Password : ''
  })
  const {Email, Password} = formData;
  const navigate =  useNavigate();
  const { updateUser } = usePatient();


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
        Email: Email,
        Password: Password
    };

    try {
        const response = await axios.post('http://localhost:3000/patient/login', userData);
        const userPatient = response.data;
        updateUser(userPatient);
        console.log(userPatient);
        localStorage.setItem('token', userPatient.token)
        navigate('../patient/dashboard');


    } catch (error) {
        console.error('Error logging in:', error);
    
    }

    console.log(userData);
  };
  
 


  return (
    <div className='container d-flex flex-column align-items-center justify-content-center py-5'>
        <h2>Login as a Patient</h2>
        <form className='d-flex flex-column w-50 gap-2 ' onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="Email" placeholder='Enter your email' name="Email" className="form-control" value={Email} onChange={onChange}></input>

            <label>Password</label>
            <input type="Password" placeholder='Enter your password' name="Password" className="form-control" value={Password} onChange={onChange}></input>
            <button type='submit'>Login</button>
        </form>
        <p className='py-2'>Not a Member? <Link to='../patient/regi'>Sign Up</Link></p>
        
    </div>
  )
}

export default PatientLogin