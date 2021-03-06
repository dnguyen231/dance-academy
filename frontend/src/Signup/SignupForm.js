import React, {useState } from 'react'
import './SignupForm.css'
import useForm from "./useForm"

const SignupForm = ({ submitForm }) => {

    const {handleChange, handleFormSubmit, values, errors} = useForm(submitForm);
    return (
        <div className="container__">
            <div className="app__wrapper">
                <div>
                    <h2 className="title">JOIN NOW!</h2>
                </div>
                <form className="form__wrapper">
                    <div className="fname">
                        <label className="label">First Name</label>
                        <input className="input" type="text" name="fname" value={values.fname} onChange={handleChange} />
                        {errors.fname && <p className="error">{errors.fname}</p>}
                    </div>
                    <div className="lname">
                        <label className="label">Last Name</label>
                        <input className="input" type="text" name="lname" value={values.lname} onChange={handleChange} />
                        {errors.lname && <p className="error">{errors.lname}</p>}
                    </div>
                    <div className="dob">
                        <label className="label">DOB (MM-DD-YYYY)</label>
                        <input className="input" type="text" name="dob" value={values.dob} onChange={handleChange} />
                        {errors.dob && <p className="error">{errors.dob}</p>}
                    </div>
                    <div className="phone">
                        <label className="label">Phone Number</label>
                        <input className="input" type="text" name="phone" value={values.phone} onChange={handleChange} />
                        {errors.phone && <p className="error">{errors.phone}</p>}
                    </div>
                    <div className="address">
                        <label className="label">Address</label>
                        <input className="input" type="text" name="address" value={values.address} onChange={handleChange} />
                        {errors.address && <p className="error">{errors.address}</p>}
                    </div>
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
                    <div>
                        <button className="submit" onClick={handleFormSubmit}>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignupForm
