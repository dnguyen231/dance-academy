import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import Home from './Home/Home';
import Header from './Home/Header';

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
        <div className="dance-academy">
          {/* Home */}
          <Home />
              {/* Header */}
              <Header />
              {/* Banner */}
              {/* Photos */}
              {/* Footer */}
          {/* Instructors Page */}
          {/* Schedule */}

        </div>
    );
};

export default App;