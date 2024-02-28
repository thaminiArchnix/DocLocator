import React from 'react'
import './doctor.css';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const NavbarContainer = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <div className='mx-auto text-white'>DocLocator</div>
        <Nav className="mx-auto">
            <Nav.Link href="./dashboard">Home</Nav.Link>
            <Nav.Link href="./appointments">My Appointments</Nav.Link>
            <Nav.Link href="./history">Treatment History</Nav.Link>
            <Nav.Link href="./profile">Profile</Nav.Link>
        </Nav>
        <div className='mx-3'><Button className='mr-3' variant="primary" href='../login'>Logout</Button>{' '}</div>
    </Navbar>
  )
}

export default NavbarContainer