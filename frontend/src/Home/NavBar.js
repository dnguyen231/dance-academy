import React from 'react';
import './NavBar.css';
import logo from '../photos/logo.png';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar">
            <Link to="/"><img className="navbar__logo" src={logo} alt="logo" /></Link>
            <ul className="nav-links">
                <Link to="/instructors" className="instructors">
                    <li>Instructors</li>
                </Link>
                <Link to="/schedule" className="schedule">
                    <li><a className="active">Schedule</a></li>
                </Link>
                <Link to="/login" className="login">
                    <li>Login</li>
                </Link>
                <Link to="/signup" className="signup">
                    <li>Signup</li>
                </Link>
            </ul>
        </nav>
    )
}

export default NavBar;