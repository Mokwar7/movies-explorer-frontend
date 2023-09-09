import '../../index.css';
import { NavLink, useLocation } from 'react-router-dom';
import React from 'react';
import man from '../../images/icon man header.svg'

function Header({isLoggedIn}) {
    const [isActive, setIsActive] = React.useState(false)
    const [isMain, setIsMain] = React.useState(false)
    const [isHidden, setIsHidden] = React.useState(false)
    let location = useLocation()

    React.useEffect(() => {
        if ('/' === location.pathname) {
            setIsMain(true)
            setIsHidden(false)
        } else if ('/404' === location.pathname || '/signup' === location.pathname || '/signin' === location.pathname) {
            setIsHidden(true)
            setIsMain(false)
        } else {
            setIsHidden(false)
            setIsMain(false)
        }
    }, [location])

    function change() {
        setIsActive(!isActive)
    }

    return(
        <>
        {!isHidden && 
        <header className={'header' + (isMain ? ' header_main' : '')}>
            <div className='header__container'>
                <NavLink to='/' className='header__logo'></NavLink>
                {isLoggedIn && <>
                <div className={'header__container-burger' + (isActive ? ' header__container-burger_active' : '')} onClick={change}>
                    <span className={'header__burger' + (isActive ? ' header__burger_active' : '')}></span>
                </div>
                <menu className={'header__container-nav' + (isActive ? ' header__container-nav_active' : '') + (isMain ? ' header__container-nav_main' : '')}>
                    <div className='header__nav'>
                        <NavLink to='/' className='header__nav-link header__nav-link-main'>Главная</NavLink>
                        <NavLink to='/movies' className='header__nav-link'>Фильмы</NavLink>
                        <NavLink to='/saved-movies' className='header__nav-link'>Сохранённые фильмы</NavLink>
                    </div>
                    <NavLink to='/profile' className='header__account'>
                        <img alt='значок пользователя' src={man} className='header__account-img'/>
                        <p className='header__account-text'>Аккаунт</p>
                    </NavLink>
                </menu>
                <div className={'header__cover' + (isActive ? ' header__cover_active' : '')} onClick={change}></div>
                </>}
                {!isLoggedIn &&
                <nav className='header__container-auth'>
                    <NavLink to='/signup' className='header__register hover_link'>Регистрация</NavLink>
                    <NavLink to='/signin' className='header__login'>Войти</NavLink>
                </nav>
                }
                
            </div>
        </header>
        }
        </>
    )
};

export default Header;
