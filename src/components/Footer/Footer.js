import '../../index.css'
import React from 'react'
import { useLocation } from 'react-router-dom';

function Footer() {
    const [isHidden, setIsHidden] = React.useState(false)
    let location = useLocation()

    React.useEffect(() => {
        if ('/404' === location.pathname || '/profile' === location.pathname || '/signup' === location.pathname || '/signin' === location.pathname) {
            setIsHidden(true)
        } else {
            setIsHidden(false)
        }
    }, [location])

    return (
        <>
        {!isHidden &&
        <footer className='footer'>
            <h3 className='footer__header'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
            <div className='footer__container-about'>
                <p className='footer__text'>@ 2020</p>
                <div className='footer__container-links'>
                    <a href='https://practicum.yandex.ru/' target="_blank" rel='noreferrer' className='footer__link'>Яндекс.Практикум</a>
                    <a href='https://github.com/Mokwar7/react-mesto-api-full-gha' target="_blank" rel='noreferrer' className='footer__link'>Github</a>
                </div>
            </div>
        </footer>
        }
        </>
    )
};

export default Footer;
