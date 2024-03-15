import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import './doctor.css';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDoctor } from '../../context/DoctorContext';


const NavbarContainer = () => {
  const {logout} = useDoctor();
  const navigate = useNavigate();

  //logout with context and navigate to login page
  const handleLogout = () => {
    logout();
    navigate('../doctor/login');
  }
  
  return (
    <Navbar bg="dark" data-bs-theme="dark" className='d-flex flex-wrap align-items-center'>
        <div className='mx-auto text-white'>DocLocator</div>
        <Nav className="mx-auto align-items-center d-flex flex-wrap">
            <Nav.Link href="./dashboard" className='text-center'>Home</Nav.Link>
            <Nav.Link href="./appointments" className='text-center'>My Appointments</Nav.Link>
            <Nav.Link href="./history" className='text-center'>Treatment History</Nav.Link>
            <Nav.Link href="./profile" className='text-center'>Profile</Nav.Link>
        </Nav>
        <div className='mx-3 d-flex text-center justify-content-center'><Button className='mr-3' variant="primary" onClick={handleLogout}>Logout</Button>{' '}</div>
    </Navbar>
  )
}

export default NavbarContainer