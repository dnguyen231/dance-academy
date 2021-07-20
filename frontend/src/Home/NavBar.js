import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap'
import './NavBar.css';
import logo from '../photos/logo.png';
import UserStore from '../Login/UserStore';
import { Link, useHistory } from 'react-router-dom';

function NavBar() {
    const history = useHistory();
    function doLogout() {
        UserStore.isLoggedIn = false;
        UserStore.email = '';
        UserStore.name = '';
        UserStore.dob = '';
        UserStore.phone = '';
        UserStore.address = '';
        if(UserStore.isLoggedIn) {
            console.log("Still logged in")
        }else{
            console.log("Logged out")
        }

        history.push('/login');

        // try{
        //     let res = await fetch('/logout', {
        //         method: 'post',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     let result = await res.json();

        //     if(result && result.success) {
        //         console.log('Logged out!')
        //         UserStore.isLoggedIn = false;
        //         UserStore.email = '';
        //     }else{
        //         UserStore.loading = false;
        //         UserStore.isLoggedIn = false;
        //     }
        // }
        // catch(e) {
        //     console.log(e)
        // }
    }

    return (
        <Nav className="navbar">
            <Link to="/"><img className="navbar__logo" src={logo} alt="logo" /></Link>
            <ul className="nav-links">
                <Link to="/instructors" className="instructors">
                    <li>Instructors</li>
                </Link>
            {
                (UserStore.isLoggedIn) ? 
                    <>
                        <Link to="/schedule" className="schedule">
                            <li><a className="active">Schedule</a></li>
                        </Link>
                        <Link to="/profile" className="profile">
                            <li>My Profile</li>
                        </Link>
                    </>
                    :
                    <>
                        <Link to="/schedule" className="schedule">
                            <li><a className="active">Schedule</a></li>
                        </Link>
                        <Link to="/login" className="login">
                            <li>Sign in</li>
                        </Link>
                        <Link to="/signup" className="signup">
                            <li>Signup</li>
                        </Link>
                    </>
            }
            {
                (UserStore.isLoggedIn) ? 
                <li><button className="logout" disabled={false} onClick ={doLogout}>Log Out</button></li> : null
            }
            </ul>
        </Nav>
    )
}

export default NavBar;