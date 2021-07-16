import React from 'react'
import './Home.css'
import banner from '../photos/banner.png'

function Home() {
    return (
        <div className="home">
           <div className="home__container">
                <img className="banner" src={banner} alt="banner"></img>
           </div>
        </div>
    )
}

export default Home
