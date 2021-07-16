import React from 'react';
import './Header.css';
import logo from '../photos/logo.png';

function Header()
{
    return (
        <div className='header'>
            <img 
                className='header__icon'
                src={logo}
                alt="logo"
            />
        </div>
    )
}

export default Header;