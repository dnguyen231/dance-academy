import React, { useState, useEffect } from 'react'
import './Login.css'
import {observer} from 'mobx-react';
import LoginForm from './LoginForm'
import UserStore from './UserStore'
import NavBar from '../Home/NavBar';
import Footer from '../Home/Footer';


class Login extends React.Component {
    // const adminUser = {
    //     email: "danlily231@gmail.com",
    //     password: "admin123",
    //     role: "customer"
    // }

    async componentDidMount() {
        try{
            let res = await fetch('/isLoggedIn', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let result = await res.json();

            if(result && result.success) {
                UserStore.loading = false;
                UserStore.isLoggedIn = true;
                UserStore.email = result.email;
                UserStore.name = result.fname + ' ' + result.lname;
                UserStore.dob = result.dob;
                UserStore.phone = result.phone;
                UserStore.address = result.address;
            }else{
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
            }
        }
        catch(e) {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
        }
    }


    // const [user, setUser] = useState({ email: "" });
    // const [error, setError] = useState("");

    // const history = useHistory();
    // useEffect(() => {
    //     if(localStorage.getItem('user-info')) {
    //         history.push('/add')
    //     }
    // }, [])

    // verification
    // async function Login(details) {
    //     console.log(details);

    //     let item = details
    //     let result = await fetch("http://localhost:8174/login", {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type":'application/json',
    //             "Accept": 'application/json'
    //         },
    //         body: JSON.stringify(item)
    //     })

    //     result = await result.json();
    //     // localStorage.setItem(JSON.stringify(result))
    //     history.pushState("/add")


    //     // if (details.email == adminUser.email && details.password == adminUser.password) {
    //     //     console.log("Logged in!")
        
    //     //     setUser({
    //     //         email: details.email,
    //     //     })
    //     // }else{
    //     //     console.log("Details do not match.")
    //     //     setError("You might have entered a wrong password or a wrong email.")
    //     // }
    // }

    // const Logout = () => {
    //     console.log("Logout");
    //     setUser({ name: "", email: "" });
    // }

    render() {
        if (UserStore.loading) {
            return (
                <div className="app_">
                    <NavBar />
                    <div className="container_">
                        <p>Loading, please wait..</p>
                    </div>
                    <Footer />
                </div>
            )
        }else{
            if(UserStore.isLoggedIn) {
                return (
                    <div className="app_">
                        <NavBar />
                        <div className="container_">
                            <p>Welcome {UserStore.email}</p>
                        </div>
                        <Footer />
                    </div>
                )
            }

            return(
                <div className="_login">
                    <NavBar />
                    <div className='container_'>
                        <LoginForm />
                    </div>
                    <Footer />
                </div>
            )
        }

        return (
            <div className='_login'>
                {/* {(user.email != "") ? (
                    <div className="welcome">
                        <h2>Welcome</h2>
                        <button onClick={Logout}>Logout</button>
                    </div>
                ) : (
                    <LoginForm Login={Login} error={error} />
                )} */}
            </div>
        )
    }
}

export default observer(Login);
