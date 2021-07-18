import React, { useState, useEffect } from 'react'
import './Login.css'
import { useHistory } from 'react-router-dom'
import LoginForm from './LoginForm'

function Login() {
    const adminUser = {
        email: "danlily231@gmail.com",
        password: "admin123"
    }

    const [user, setUser] = useState({ email: "" });
    const [error, setError] = useState("");

    const history = useHistory();
    useEffect(() => {
        if(localStorage.getItem('user-info')) {
            history.push('/add')
        }
    }, [])

    // verification
    async function Login(details) {
        console.log(details);

        let item = details
        let result = await fetch("http://localhost:8174/login", {
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify(item)
        })

        result = await result.json();
        localStorage.setItem(JSON.stringify(result))
        history.pushState("/add")


        if (details.email == adminUser.email && details.password == adminUser.password) {
            console.log("Logged in!")
        
            setUser({
                email: details.email,
            })
        }else{
            console.log("Details do not match.")
            setError("You might have entered a wrong password or a wrong email.")
        }
    }

    const Logout = () => {
        console.log("Logout");
        setUser({ name: "", email: "" });
    }

    return (
        <div className='_login'>
            {(user.email != "") ? (
                <div className="welcome">
                    <h2>Welcome</h2>
                    <button onClick={Logout}>Logout</button>
                </div>
            ) : (
                <LoginForm Login={Login} error={error} />
            )}
        </div>
    )
}

export default Login
