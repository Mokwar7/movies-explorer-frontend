import { NavLink } from 'react-router-dom';
import '../../index.css'
import React from 'react';

function ErrorPage() {
    React.useEffect(() => {
        document.title = 'Страница не найдена'
    }, [])

    return (
        <div className='error'>
            <h3 className='error__code'>404</h3>
            <p className='error__text'>Страница не найдена</p>
            <NavLink to='/' className='error__link'>Назад</NavLink>
        </div>
    )
};

export default ErrorPage;
