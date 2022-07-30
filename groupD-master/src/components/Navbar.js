import React, { useState } from 'react';
import Isidore1 from "./Pics/Isidore1.svg";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { MdMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import Swal from 'sweetalert2';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    
    function deleteToken(){
        window.localStorage.clear();
        console.log('cleared the token');
        Swal.fire({
            title: 'Are you sure you want to logout?',
            text: "Any unsaved progress will be deleted.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
              console.log('cleared the token')
              if (result.isConfirmed) {
                Swal.fire(
                    'Logged out!',
                    'You have been logged out of your session.',
                    'success'
                    )
                    window.localStorage.clear();
                    const token = localStorage.getItem('token');
                    console.log(token);
                    navigate('/login')
                  } 
              })
  }


    return (
        <nav className="navbar">
            <Link to="/" className="dashboardlink">
                <div className="combinedlogo">
                    <img className="navlogo" src={Isidore1} alt="System Logo" />
                    <h3 className="navtitle">St. Isidore High School</h3>
                </div>
            </Link>
            <ul className={isMobile ? "nav-links-mobile" : "nav-links"}
                onClick={() => setIsMobile(false)}
            >
                <Link to="/academic-year" className="acadyearlink">
                    <li>Year</li>
                </Link>
                <Link to="/academic-term" className="acadtermlink">
                    <li>Term</li>
                </Link>
                <Link to="/schedule" className="schedulelink">
                    <li>Schedule</li>
                </Link>
                <Link to="/room" className="roomlink">
                    <li>Rooms</li>
                </Link>
                <Link to="/department" className="departmentlink">
                    <li>Departments</li>
                </Link>
                <Link to="/instructor" className="instructorlink">
                    <li>Instructors</li>
                </Link>
                <Link to="/program" className="programlink">
                    <li>Programs</li>
                </Link>
                <Link to="/course" className="courselink">
                    <li>Courses</li>
                </Link>
                <Link to="/block" className="blocklink">
                    <li>Blocks</li>
                </Link>
                <Link to="/student" className="studentlink">
                    <li>Students</li>
                </Link>
                <button className="logoutlink" onClick={deleteToken}>
                    <li>Log Out</li>
                </button>
            </ul>
            <button className="mobile-menu-icon"
                onClick={() => setIsMobile(!isMobile)}
            >
                {isMobile ? <MdClose /> : <MdMenu />}
            </button>
        </nav>
    );
};

export default Navbar;