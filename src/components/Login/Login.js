import '../../index.css'
import React from 'react';
import { NavLink } from 'react-router-dom';

function Login () {
    React.useEffect(() => {
        document.title = 'Вход'
    }, [])

    return (
        <div className='reg'>
            <div className='reg__container'>
                <NavLink to='/' className='header__logo'></NavLink>
                <h3 className='reg__header'>Рады видеть!</h3>
                <form className='reg__form'>
                    <label className='reg__label'>
                        <p className='reg__text'>E-mail</p>
                        <input className='reg__input' placeholder='pochta@yandex.ru' type='email'></input>
                        <span className='email-error reg__error'></span>
                    </label>
                    <label className='reg__label'>
                        <p className='reg__text'>Пароль</p>
                        <input className='reg__input' placeholder='qwerty123' type='password'></input>
                        <span className='password-error reg__error'>fdsdsdsdsds</span>
                    </label>
                    <button type='submit' className='reg__button'>Войти</button>
                    <p className='reg__suggest'>
                        Ещё не зарегистрированы?
                        <NavLink className='reg__link' to='/signup'> Регистрация</NavLink>
                    </p>
                </form>
            </div>
        </div>
    )
};

export default Login;
