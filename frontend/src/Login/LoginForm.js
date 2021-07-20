import React, {useState } from 'react'
import './LoginForm.css'
import useLoginForm from "./useLoginForm"

const LoginForm = ({ submitForm }) => {

    const {handleChange, handleFormSubmit, values, errors} = useLoginForm(submitForm);
    return (
        <div className="container__">
            <div className="app__wrapper">
                <div>
                    <h2 className="title">SIGN IN</h2>
                </div>
                <form className="form__wrapper">
                    <div className="email">
                        <label className="label">Email</label>
                        <input className="input" type="email" name="email" value={values.email} onChange={handleChange} />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="password">
                        <label className="label">Password</label>
                        <input className="input" type="password" name="password" value={values.password} onChange={handleChange} />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div className="role">
                        <label className="label">Role</label>
                        <input className="input" type="role" name="role" value={values.role} onChange={handleChange} />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div>
                        <button className="submit" onClick={handleFormSubmit}>SIGN IN</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
