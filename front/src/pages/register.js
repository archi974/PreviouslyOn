import React from 'react';
import "./register.css";
import Jinx from "../images/jinx.jpg"

export default function Register() {
    return (
        <div style={{ backgroundImage: `url(${Jinx})`, height: '46.5rem', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
            <div className='link'>
                <a href="https://www.betaseries.com/authorize?client_id=0ed5273cce43&redirect_uri=http://localhost:4000">Se connecter</a>
            </div>
        </div>
    );
}