import React from 'react'
import './Footer.css'
import footer from '../photos/footer.png'
import footer2 from '../photos/footer2.png'

function Footer() {
    return (
        <div className="footer">
            <img className='img1' src={footer} alt="footer" />
            <img className='img2' src={footer2} alt="footer2" />
        </div>
    )
}

export default Footer
