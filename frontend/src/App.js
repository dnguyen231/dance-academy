import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import NavBar from './Home/NavBar';
import Home from './Home/Home';
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
            <Home />
        </Router>
    );
};

export default App;