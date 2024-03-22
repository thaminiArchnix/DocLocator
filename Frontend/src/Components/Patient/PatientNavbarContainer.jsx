import React from 'react'
import './patient.css';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const PatientNavbarContainer = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" className='d-flex flex-wrap align-items-center'>
        <div className='mx-auto text-white'><h3>DocLocator</h3></div>
        <Nav className="mx-auto align-items-center d-flex flex-wrap">
            <Nav.Link href="./dashboard" className='text-center'>Home</Nav.Link>
            <Nav.Link href="./myappointment" className='text-center'>My Appointments</Nav.Link>
            <Nav.Link href="./history" className='text-center'>Treatment History</Nav.Link>
            <Nav.Link href="./profile" className='text-center'>Profile</Nav.Link>
        </Nav>
        <div className='mx-3 d-flex text-center justify-content-center'><Button className='mr-3' variant="primary" href='./login'>Logout</Button>{' '}</div>
    </Navbar>
  )
}

export default PatientNavbarContainer