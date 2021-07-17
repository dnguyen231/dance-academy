import React from 'react'
import './Home.css'
import banner from '../photos/banner.png'
import banner2 from '../photos/banner2.png'
import row1 from '../photos/row1.png'
import row2 from '../photos/row2.png'
import News from './News'

function Home() {
    return (
        <div className="home">
           <div className="home__container">
                <img className="banner" src={banner} alt="banner" />
                <img className="banner" src={banner2} alt="banner2" />
                <div className="home__row">
                    <News title='HOBI' image={row1} command='SEE INSTRUCTOR PROFILE' />
                    <News title='SCHEDULE' image={row2} command='SEE MORE' />
                </div>
           </div>
        </div>
    )
}

export default Home
