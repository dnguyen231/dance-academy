import React from 'react'
import './ProfileInfo.css'
import profile from '../../photos/profile.png'
import UserStore from '../UserStore'

function ProfileInfo() {
    return (
        <div className="profile__info">
            <img src={profile} alt='profile-picture' />
            <div className="info">
                <br />
                <h1>{UserStore.name}</h1>
                <br />
                <p>{UserStore.dob}</p>
                <p>{UserStore.phone}</p>
                <p>{UserStore.address}</p> 
            </div>
        </div>
    )
}

export default ProfileInfo
