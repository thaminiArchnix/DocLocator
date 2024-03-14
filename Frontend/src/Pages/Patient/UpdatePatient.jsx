import React, { useEffect, useState } from 'react'
import { useDoctor } from '../../context/DoctorContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdatePatient = () => {
    const {updateUser, userData} = useDoctor();
    const [formData, setFormData] = useState(userData.user[0]);
    const [newpassword, SetNewPassword] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/patient/getpatient/${userData.user[0].PatientId}`)
                setFormData(response.data[0]);
                setFormData((prevState) => ({
                    ...prevState,
                    password: ""
                }));
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    },[]);
    
    // --doesn't work for newpassword
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value,
        }));
    };
    
    

    const onChangeNewPass = (e) => {
        SetNewPassword(e.target.value);
    };

    const onChangeConfirmPass = (e) => {
        setConfirmPassword(e.target.value);
    }

    const isValidPassword = (password) => {
        const lowerCaseRegex = /[a-z]/;
        const upperCaseRegex = /[A-Z]/;
        const digitOrSymbolRegex = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    
        return (
          password.length >= 8 &&
          lowerCaseRegex.test(password) &&
          upperCaseRegex.test(password) &&
          digitOrSymbolRegex.test(password)
        );
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newValidation = isValidPassword(newpassword);
        
        if (!newValidation) {
          console.error('New password is not strong enough');
          return;
        }
      
        // Check if the current password is provided
        if (!formData.Password) {
          console.error('Please provide the current password');
          return;
        }
      
        // Check if the new password and confirm password match
        if (newpassword !== confirmpassword) {
          console.error('Passwords do not match');
          return;
        }
      
        const data = {
          Name: formData.Name,
          Email: userData.user.Email,
          DOB: formData.DOB,
          Password: formData.Password, // Sending current password
          Gender: formData.Gender,
          Phone: formData.Phone,
          newpass: newpassword
        };
        
        try {
          const response = await axios.put(`http://localhost:3000/patient/updatepatient/${userData.user[0].PatientId}`, data);
          updateUser(response.data);
          navigate('../patient/profile');
        } catch (error) {
          console.error('Error updating profile:', error.response);
        }
      };
      

    
    
  return (
    <div>
        <div className='container d-flex flex-column align-items-center justify-content-center py-5'>
        <h2>Update Profile</h2>
        <form className='d-flex flex-column w-50 gap-2' onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input type="text" value={formData.Name} placeholder='Enter your Full Name' className="form-control" onChange={onChange} name='Name'></input>
            <label>Phone Number</label>
            <input type="tel" value={formData.Phone} placeholder='Enter your phone number' className="form-control" onChange={onChange} name='Phone'></input>
            <label>Gender</label>
            <select value={formData.Gender} className="form-control" onChange={onChange} name='Gender'>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <label>Date of Birth</label>
            <input type="date" value={formData.DOB} placeholder='Enter your Date of Birth' className="form-control" onChange={onChange} name='DOB'></input>
            
            <label>Current Password</label>
            <input type="password" placeholder='Enter current password' className="form-control" onChange={onChange} name='Password'></input>
            <label>New Password</label>
            <input type="password" value={formData.newpassword} placeholder='Enter new password' className="form-control" onChange={onChangeNewPass} name='newpassword'></input>
            <label>Confirm New Password</label>
            <input type="password" value={formData.confirmpassword} placeholder='Confirm new password' className="form-control" onChange={onChangeConfirmPass} name='confirmpassword'></input>
            <button type='submit'>Update Profile</button>
        </form>
        </div>
    </div>
  );
}

export default UpdatePatient;
