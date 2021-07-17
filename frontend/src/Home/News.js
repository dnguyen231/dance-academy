import React from 'react'
import './News.css'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function News({ title, image, command }) {
    return (
        <div className="news">
            <div className='news__info'>
                <p>{title}</p>
            </div>
            <div className='news__btn'>
                <a>{command}</a>
                <ArrowForwardIcon className='arrow' />
            </div>
            <div className='news__photo'>
                <img src={image} alt='photo' />
            </div>
        </div>
    )
}

export default News
