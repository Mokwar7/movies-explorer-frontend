/* eslint-disable default-case */
import '../../index.css'
import React from 'react';
import { NavLink } from 'react-router-dom';

function Register () {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const [errorName, setErrorName] = React.useState('Имя не должно быть пустым')
    const [errorPassword, setErrorPassword] = React.useState('Пароль не может быть пустым')
    const [errorEmail, setErrorEmail] = React.useState('Почта не может быть пустой')
    const [nameDirty, setErrorDirty] = React.useState(false)
    const [emailDirty, setEmailDirty] = React.useState(false)
    const [passwordDirty, setPasswordDirty] = React.useState(false)
    const [formValid, setFormValid] = React.useState(false)
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    React.useEffect(() => {
        document.title = 'Регистрация'
    }, [])

    React.useEffect(() => {
        if (errorEmail || errorPassword || errorName) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [errorEmail, errorPassword, errorName])

    function handleChangeName (e) {
        setName(e.target.value)

        if (e.target.value.length < 2) {
            setErrorName('Имя должно быть длиннее 1 символа')

            if (!e.target.value) {
                setErrorName('Имя не должно быть пустым')
            }
        } else {
            setErrorName('')
        }
    }

    function handleChangeEmail (e) {
        setEmail(e.target.value)

        if (!regexEmail.test(String(e.target.value).toLowerCase())) {
            setErrorEmail('Некорректная почта')

            if (!e.target.value) {
                setErrorEmail('Почта не может быть пустой')
            }
        } else {
            setErrorEmail('')
        }
    }

    function handleChangePassword (e) {
        setPassword(e.target.value)

        if (e.target.value.length < 8) {
            setErrorPassword('Пароль должен быть длиннее 8 символов')

            if (!e.target.value) {
                setErrorPassword('Пароль не может быть пустым')
            }
        } else {
            setErrorPassword('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setErrorDirty(true)
                break
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
       }
    }

    return (
        <section className='reg'>
            <div className='reg__container'>
                <NavLink to='/' className='header__logo reg__logo'></NavLink>
                <h3 className='reg__header'>Добро пожаловать!</h3>
                <form className='reg__form'>
                    <div className='reg__container-label'>
                        <label className='reg__label'>
                            <p className='reg__text'>Имя</p>
                            <input className='reg__input' name='name' onBlur={blurHandler} placeholder='Виталий' type='text' required value={name} onChange={handleChangeName}></input>
                            <span className='name-error reg__error'>{nameDirty && (errorName)}</span>
                        </label>
                        <label className='reg__label'>
                                <p className='reg__text'>E-mail</p>
                                <input className='reg__input' name='email' onBlur={blurHandler} placeholder='pochta@yandex.ru' type='email' required value={email} onChange={handleChangeEmail}></input>
                                <span className='reg__error'>{emailDirty && (errorEmail)}</span>
                        </label>
                        <label className='reg__label'>
                            <p className='reg__text'>Пароль</p>
                            <input className='reg__input' name='password' onBlur={blurHandler} placeholder='qwerty123' type='password' required value={password} onChange={handleChangePassword}></input>
                            <span className='reg__error'>{passwordDirty && (errorPassword)}</span>
                        </label>
                    </div>
                    <div className='reg__container-btn'>
                        <button type='submit' className='reg__button' disabled={!formValid}>Войти</button>
                        <p className='reg__suggest'>
                            Уже зарегистрированы?
                            <NavLink className='reg__link' to='/signin'> Войти</NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    )
};

export default Register;
