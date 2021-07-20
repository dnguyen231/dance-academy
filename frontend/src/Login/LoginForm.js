import React, { useState } from 'react'
import InputField from './InputField';
import './LoginForm.css'
import SubmitButton from './SubmitButton';
import UserStore from './UserStore';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            role: '',
            buttonDisabled: false
        }
    }

    setInputValue(property, val) {
        val = val.trim();
        if(val.length > 100)
        {
            return;
        }
        this.setState({
            [property]: val
        })
    }

    resetForm() {
        this.setState({
            email: '',
            password: '',
            role: '',
            buttonDisabled: false
        })
    }

    async doLogin() {
        if(!this.state.email){
            return;
        }
        if(!this.state.password){
            return;
        }
        this.setState({
            buttonDisabled: true
        })
        
        try{
            let res = await fetch('/login', {
                method: 'post',
                heasers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    role: this.state.role
                })
            })
            let result = await res.json();
            if(result && result.success){
                UserStore.isLoggedIn = true;
                UserStore.email = result.email;
            }
            else if(result && result.success === false)
            {
                this.resetForm();
                alert(result.msg);  
            }
        }
        catch(e){
            console.log(e);
            this.resetForm();
        }
    }

    // const [details, setDetails] = useState({email: "", password: "", role: ""});

    // const handleFormSubmit = e => {
    //     e.preventDefault();
    //     Login(details);
    // }

    render() {
        return (
            <div className="container">
            <div className="app__wrapper">
                <div>
                    <h2 className="title">SIGN IN</h2>
                </div>
                <form className="form__wrapper">
                    <label className="label__">Email</label>
                    <InputField className="input" type="email" placeholder="email" value={this.state.email ? this.state.email: ""} onChange={ (val) => this.setInputValue('email', val) } />
                    <label className="label__">Password</label>
                    <InputField className="input" type="password" placeholder="password" value={this.state.password ? this.state.password: ""} onChange={ (val) => this.setInputValue('password', val) } />
                    <label className="label__">Role (Customer/Instructor)</label>
                    <InputField className="input" type="role" placeholder="role" value={this.state.role ? this.state.role: ""} onChange={ (val) => this.setInputValue('role', val) } />
                    {/* <div className="email">
                        <label className="label__">Email</label>
                        <input className="input" type="email" placeholder="email" value={this.state.email ? this.state.email: ""} onChange={ (val) => this.setInputValue('email', val) } />
                    </div>
                    <div className="password">
                        <label className="label__">Password</label>
                        <input className="input" type="password" placeholder="password" value={this.state.password ? this.state.password: ""} onChange={ (val) => this.setInputValue('password', val) } />
                    </div>
                    <div className="role">
                        <label className="label__">Role (Customer/Instructor)</label>
                        <input className="input" type="text" placeholder="role" value={this.state.role ? this.state.role: ""} onChange={ (val) => this.setInputValue('role', val) } />
                    </div> */}
                    {/* { (error != "") ? (<div className="error">{error}</div>) : ""} */}
                    {/* <div>
                        <button className="submit" onClick={handleFormSubmit}>Sign In</button>
                    </div> */}
                    <SubmitButton text="Sign in" disabled={this.state.buttonDisabled} onClick={() => this.doLogin() } />
                </form>
            </div>
        </div>
        )
    }
        
}

export default LoginForm
