import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import NavBar from './Home/NavBar';
import Home from './Home/Home';
import Footer from './Home/Footer';
import Instructors from './Instructors/Instructors';
import Schedule from './Schedule/Schedule';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
    useEffect(() => {
        const getAPI = () => {
            // Change this endpoint to whatever local or online address you have
            // Local PostgreSQL Database
            const API = 'http://127.0.0.1:5000/';

            fetch(API)
                .then((response) => {
                    console.log(response);
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setLoading(false);
                    setApiData(data);
                });
        };
        getAPI();
    }, []);
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);

    

    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/instructors">
                    <Instructors />
                </Route>
                <Route path="/schedule">
                    <Schedule />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
            <Footer />
        </Router>
    );
};

export default App;