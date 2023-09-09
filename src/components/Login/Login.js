/* eslint-disable default-case */
import '../../index.css'
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Login ({login}) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [errorPassword, setErrorPassword] = React.useState('Пароль не может быть пустым')
    const [errorEmail, setErrorEmail] = React.useState('Почта не может быть пустой')
    const [emailDirty, setEmailDirty] = React.useState(false)
    const [passwordDirty, setPasswordDirty] = React.useState(false)
    const [formValid, setFormValid] = React.useState(false)
    const [errorRes, setErrorRes] = React.useState('')
    let nav = useNavigate()
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    React.useEffect(() => {
        document.title = 'Вход'
    }, [])

    React.useEffect(() => {
        if (errorEmail || errorPassword) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [errorEmail, errorPassword])

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
        } else if (e.target.value.length > 30) {
            setErrorPassword('Пароль должен быть короче 30 символов')
        } else {
            setErrorPassword('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
       }
    }

    function log(e) {
        e.preventDefault()
        return fetch('http://localhost:3001/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
          },
          body: JSON.stringify({
              'password': password,
              'email': email,
          })
        })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(res)
        })
        .then((result) => {
          localStorage.setItem('jwt', result.token)
          nav('/', {replace: true})
          login()
        })
        .catch((err) => {
          setErrorRes('Неправильная почта или пароль')
          setFormValid(false)
        })
      }

    return (
        <main>
            <section className='reg'>
                <div className='reg__container'>
                    <NavLink to='/' className='header__logo reg__logo'></NavLink>
                    <h3 className='reg__header'>Рады видеть!</h3>
                    <form className='reg__form' onSubmit={log}>
                        <div className='reg__container-label'>
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
                            <span className='profile__err reg__err'>{errorRes}</span>
                            <button type='submit' className='reg__button' disabled={!formValid}>Войти</button>
                            <p className='reg__suggest'>
                                Ещё не зарегистрированы?
                                <NavLink className='reg__link' to='/signup'> Регистрация</NavLink>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
};

export default Login;
