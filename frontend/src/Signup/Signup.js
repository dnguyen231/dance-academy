import React, {useState} from 'react'
import './Signup.css'
import SignupForm from './SignupForm'
import Success from './Success'

function Signup() {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);

    const submitForm = () => {
        setFormIsSubmitted(true);
    }

    return (
        <div className='_signup'>
            { !formIsSubmitted ? <SignupForm submitForm={submitForm} /> : <Success />}
        </div>
    )
}

export default Signup
