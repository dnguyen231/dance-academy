import React, { useState } from 'react'
import './LoginForm.css'

function LoginForm({ Login, error }) {
    const [details, setDetails] = useState({email: "", password: ""});

    const handleFormSubmit = e => {
        e.preventDefault();
        Login(details);
    }

    return (
            <div className="container">
            <div className="app__wrapper">
                <div>
                    <h2 className="title">SIGN IN</h2>
                </div>
                <form className="form__wrapper">
                    <div className="email">
                        <label className="label">Email</label>
                        <input className="input" type="email" name="email" id="name" onChange={e => setDetails({...details, email: e.target.value})} />
                    </div>
                    <div className="password">
                        <label className="label">Password</label>
                        <input className="input" type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} />
                    </div>
                    { (error != "") ? (<div className="error">{error}</div>) : ""}
                    <div>
                        <button className="submit" onClick={handleFormSubmit}>Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
