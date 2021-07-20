import React, {useState} from 'react'
import './Signup.css'
import SignupForm from './SignupForm'
import Success from './Success'
import Footer from '../Home/Footer'
import NavBar from '../Home/NavBar'

function Signup() {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);

    const submitForm = () => {
        setFormIsSubmitted(true);
    }

    return (
        <div className='_signup'>
            <NavBar />
            { !formIsSubmitted ? <SignupForm submitForm={submitForm} /> : <Success />}
            <Footer />
        </div>
    )
}

export default Signup
