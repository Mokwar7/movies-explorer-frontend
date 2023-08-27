import '../../index.css'
import React from 'react';
import { NavLink } from 'react-router-dom';

function Register () {
    React.useEffect(() => {
        document.title = 'Регистрация'
    }, [])

    return (
        <div className='reg'>
            <div className='reg__container'>
                <NavLink to='/' className='header__logo'></NavLink>
                <h3 className='reg__header'>Добро пожаловать!</h3>
                <form className='reg__form'>
                    <label className='reg__label'>
                        <p className='reg__text'>Имя</p>
                        <input className='reg__input' placeholder='Виталий' type='text'></input>
                        <span className='name-error reg__error'></span>
                    </label>
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
                    <button type='submit' className='reg__button'>Зарегистрироваться</button>
                    <p className='reg__suggest'>
                        Уже зарегистрированы?
                        <NavLink className='reg__link' to='/signin'> Войти</NavLink>
                    </p>
                </form>
            </div>
        </div>
    )
};

export default Register;
