import React from 'react';
import './errorMessage.css';

const ErrorMessage = () => {
return (
    <>
    <img src={process.env.PUBLIC_URL + '/img/error-img.jpeg'} alt='error'></img>
    <span className="error-text">Something went wrong...</span>
    </>
)
}

export default ErrorMessage;