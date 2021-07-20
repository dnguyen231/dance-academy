import React, { useState } from 'react'
import InputField from './InputField';
import './LoginForm.css'
import SubmitButton from './SubmitButton';
import UserStore from './UserStore';

const LoginForm = () => {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         email: '',
    //         password: '',
    //         role: '',
    //         buttonDisabled: false
    //     }
    // }

    const [loginValues, setLoginValues] = useState({
        email: "",
        password: "",
        role: ""
    }
    );

    const handleChange = (event) => {
        setLoginValues({
            ...loginValues,
            [event.target.name]: event.target.value,
        });
    };

    // setInputValue(property, val) {
    //     val = val.trim();
    //     if(val.length > 100)
    //     {
    //         return;
    //     }
    //     this.setState({
    //         [property]: val
    //     })
    // }

    // resetForm() {
    //     this.setState({
    //         email: '',
    //         password: '',
    //         role: '',
    //         buttonDisabled: false
    //     })
    // }

    async function doLogin() {
        // if(!this.state.email){
        //     return;
        // }
        // if(!this.state.password){
        //     return;
        // }
        // this.setState({
        //     buttonDisabled: true
        // })

        let item = loginValues;
        console.log(item);

        let result = await fetch("http://localhost:8666/sign-up", {
            method: 'POST',
            body: JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept": 'application/json'
            }
        })
        result = await result.json()
        if(result && result.success){
            UserStore.isLoggedIn = true;
            UserStore.email = result.email;
        }
        else if(result && result.success === false)
        {
            this.resetForm();
            alert(result.msg);  
        }
        
    //     try{
    //         let res = await fetch('/login', {
    //             method: 'post',
    //             heasers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 email: this.state.email,
    //                 password: this.state.password,
    //                 role: this.state.role
    //             })
    //         })
    //         let result = await res.json();
            
    //     }
    //     catch(e){
    //         console.log(e);
    //         this.resetForm();
    //     }
    // }

    // const [details, setDetails] = useState({email: "", password: "", role: ""});

    // const handleFormSubmit = e => {
    //     e.preventDefault();
    //     Login(details);
    // }
        return (
            <div className="container">
            <div className="app__wrapper">
                <div>
                    <h2 className="title">SIGN IN</h2>
                </div>
                <form className="form__wrapper">
                    <label className="label__">Email</label>
                    <InputField className="input" name="email" type="email" placeholder="email" value={loginValues.email} onChange={handleChange} />
                    <label className="label__">Password</label>
                    <InputField className="input" name="password" type="password" placeholder="password" value={loginValues.password} onChange={handleChange} />
                    <label className="label__">Role (Customer/Instructor)</label>
                    <InputField className="input" name="role" type="role" placeholder="role" value={loginValues.role} onChange={handleChange} />
                    <SubmitButton text="Sign in" disabled={this.state.buttonDisabled} onClick={doLogin} />
                </form>
            </div>
        </div>
        )
    }
}
export default LoginForm;
