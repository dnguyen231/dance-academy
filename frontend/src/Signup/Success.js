import React from 'react'
import './Success.css'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const Success = () => {
    return (
        <div className="container">
            <div className="app__wrapper2">
                <CheckCircleOutlineIcon style={{ color: 'rgb(255, 71, 59)', fontSize: 200 }}/>
                <h1 className="form__success">SUCCESSFULLY REGISTERED</h1>
                <p className="verification">A verification link has been sent to your email account. Please click on the link and continue the registration process.</p>
            </div>
        </div>
    )
}

export default Success
