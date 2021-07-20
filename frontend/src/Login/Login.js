import React, { useState, useEffect } from 'react'
import './Login.css'
import {observer} from 'mobx-react';
import LoginForm from './LoginForm'
import UserStore from './UserStore'
import NavBar from '../Home/NavBar';
import Footer from '../Home/Footer';

function Login() {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);

    const submitForm = () => {
        setFormIsSubmitted(true);
    }

    return (
        <div className='_signup'>
            <NavBar />
            { (!formIsSubmitted) ? 
                <LoginForm submitForm={submitForm} /> :
                <div className="app_">
                    <div className="container_">
                        <h2>Sign In Form Submitted</h2>
                    </div>
                </div> 
            }
            <Footer />
        </div>
    )
}

export default observer(Login);