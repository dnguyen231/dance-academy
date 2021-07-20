import React from 'react'
import './Profile.css'
import ProfileInfo from './ProfileInfo'
import NavBar from '../../Home/NavBar'
import Footer from '../../Home/Footer'

function Profile() {
    return (
        <div className="profile__">
            <NavBar />
            <ProfileInfo /> 
            <Footer />       
        </div>
    )
}

export default Profile
