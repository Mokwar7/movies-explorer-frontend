import { NavLink } from 'react-router-dom';
import '../../index.css'
import React from 'react';

function ErrorPage() {
    let lastPage = localStorage.getItem('lastPage')

    React.useEffect(() => {
        document.title = 'Страница не найдена'
    }, [])

    return (
        <main>
            <section className='error'>
                <h1 className='error__code'>404</h1>
                <p className='error__text'>Страница не найдена</p>
                <NavLink to={lastPage} className='error__link'>Назад</NavLink>
            </section>
        </main>
    )
};

export default ErrorPage;
