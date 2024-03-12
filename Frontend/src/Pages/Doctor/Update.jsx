import React, { useEffect, useState } from 'react'
import { useDoctor } from '../../context/DoctorContext';
import LocationMap from '../../Components/LocationMap';
import axios from 'axios';
import { isValidPassword } from '../../Middleware/isValidPassword';
import { isValidPhone } from '../../Middleware/isValidPhone';
import { useNavigate } from 'react-router-dom';

const Update = () => {
    const {updateUser, userData} = useDoctor();
    const [formData, setFormData] = useState({});
    const [newpassword, SetNewPassword] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/doctor/${userData.user.id}`)
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

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value,
        }));
    };
    
    const handleMapSelect = (location) => {
        setFormData((prevState) => ({
            ...prevState,
            longitude: location.lng,
            latitude: location.lat
        }));
    };

    const onChangeNewPass = (e) => {
        SetNewPassword(e.target.value);
    };

    const onChangeConfirmPass = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData.phone_number);
        const newValidation = isValidPassword(newpassword)
        const phone = isValidPhone(`${formData.phone_number}`);
        
        if(newValidation == false) {
        console.error('New password is not Strong Enough');
        return;
        };

        if(phone == false) {
        console.error('Enter a valid phone number!');
        return;
        };
        console.log(newpassword, confirmpassword);
        if (newpassword === confirmpassword) {
            const data = {
                full_name: formData.full_name,
                email: userData.user.email,
                date_of_birth: formData.date_of_birth,
                password: formData.password,
                gender: formData.gender,
                phone_number: formData.phone_number,
                specialization: formData.specialization,
                longitude: formData.longitude,
                latitude: formData.latitude,
                newpass: newpassword 
            };
            
            try {
                const response = await axios.put(`http://localhost:3000/doctor/${userData.user.id}`, data);
                updateUser(response.data);
                navigate('../doctor/profile');
                
            } catch (error) {
                console.error('Error updating profile:', error.response);
                // Handle error response from the server
            }
            

        } else {
            console.error('Passwords do not match');
        }
    };

    
    
  return (
    <div>
        <div className='container d-flex flex-column align-items-center justify-content-center py-5'>
        <h2>Update Profile</h2>
        <form className='d-flex flex-column w-50 gap-2' onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input type="text" value={formData.full_name} placeholder='Enter your Full Name' className="form-control" onChange={onChange} name='full_name'></input>
            
            <label>Phone Number</label>
            <input type="tel" value={formData.phone_number} placeholder='Enter your phone number' className="form-control" onChange={onChange} name='phone_number'></input>
            <label>Gender</label>
            <select value={formData.gender} className="form-control" onChange={onChange} name='gender'>
              <option>None</option>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
            <label>Date of Birth</label>
            <input type="date" value={formData.date_of_birth} placeholder='Enter your Date of Birth' className="form-control" onChange={onChange} name='date_of_birth'></input>
            <label>Specialization</label>
            <input type="text" value={formData.specialization} placeholder='Enter your Specialization' className="form-control" onChange={onChange} name='specialization'></input>
            <label>Service Location</label>
            <LocationMap onSelectLocation={handleMapSelect}/>
            <label>Current Password</label>
            <input type="password" value={formData.password} placeholder='Enter current password' className="form-control" onChange={onChange} name='password'></input>
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

export default Update
