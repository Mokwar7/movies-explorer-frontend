import '../../index.css';
import { NavLink } from 'react-router-dom';
import React from 'react';
import man from '../../images/icon man header.svg'

function Header() {
    const [isLogged, setIsLogged] = React.useState(true)
    const [isActive, setIsActive] = React.useState(true)

    function change() {
        setIsLogged(!isLogged)
    }

    return(
        <div className={'header' + (isLogged ? ' header__loginned' : ' header__auth')} onClick={change}>
            <div className='header__container'>
                <NavLink to='/' className='header__logo'></NavLink>
                <div className={isLogged ? 'header__nav-container' : 'header__auth-container'}>
                    {isLogged &&
                    <>
                        <nav className='header__nav'>
                            <NavLink to='/movies' className={'header__nav-text' + (isActive ? ' header__nav-text_active' : '')}>Фильмы</NavLink>
                            <NavLink to='/saved-movies' className='header__nav-text'>Сохраненные фильмы</NavLink>
                        </nav>
                        <NavLink to='/profile' className='header__profile'>
                            <img alt='Иконка пользователя' src={man} className='header__profile-icon'/>
                            <p className='header__profile-text'>Аккаунт</p>
                        </NavLink>
                    </>
                    }
                    {!isLogged &&
                    <>
                        <NavLink to='/signup' className='header__signup'>Регистрация</NavLink>
                        <NavLink to='/signin' className='header__signin'>Войти</NavLink>
                    </>
                    }
                </div>
                <div className='header__account-container'>

                </div>
            </div>
        </div>
    )
};

export default Header;
