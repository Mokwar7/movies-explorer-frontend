/* eslint-disable default-case */
import { NavLink } from 'react-router-dom';
import '../../index.css'
import React from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({exit}) {
    const [isActive, setIsActive] = React.useState(false);
    const user = React.useContext(CurrentUserContext)
    const [name, setName] = React.useState(user.name);
    const [email, setEmail] = React.useState(user.email);
    const [errorName, setErrorName] = React.useState('')
    const [errorEmail, setErrorEmail] = React.useState('')
    const [nameDirty, setNameDirty] = React.useState(false)
    const [emailDirty, setEmailDirty] = React.useState(false)
    const [formValid, setFormValid] = React.useState(false)
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/    
    const err = ''

    React.useEffect(() => {
        document.title = 'Мой аккаунт'
        console.log(user)
    }, [user])

    React.useEffect(() => {
        if (errorEmail || errorName) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [errorEmail, errorName])

    function setActive() {
        setIsActive(!isActive)
    }

    function handleChangeName(e) {
        setName(e.target.value)

        if (e.target.value.length < 2) {
            setErrorName('Имя должно быть длиннее 1 символа')

            if (!e.target.value) {
                setErrorName('Имя не может быть пустым')
            }
        } else if (e.target.value.length > 30) {
            setErrorName('Имя должно быть короче 30 символов')
        } else {
            setErrorName('')
        }
    }

    function handleChangeEmail(e) {
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

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'name':
                setNameDirty(true)
                break
       }
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    return (
        <main>
            <section>
                <form className='profile' name='profile' onSubmit={handleSubmit}>
                    <h1 className='profile__header'>
                        Привет, {name}!
                    </h1>
                    <div className='profile__container'>
                        <p className='profile__type-info'>Имя</p>
                        {!isActive && <p className='profile__info'>{name}</p>}
                        {isActive && <input className='profile__input' name='name' onBlur={blurHandler} value={name} onChange={handleChangeName} placeholder='Виталий'></input>}
                    </div>
                    <div className='profile__container'>
                        <p className='profile__type-info'>E-mail</p>
                        {!isActive && <p className='profile__info'>{email}</p>}
                        {isActive && <input className='profile__input' name='email' onBlur={blurHandler} value={email} onChange={handleChangeEmail} placeholder='pochta@yandex.ru'></input>}
                    </div>
                    {!isActive && <>
                    <button className='profile__edit-btn' onClick={setActive} type='button'>Редактировать</button>
                    <NavLink className='profile__exit-btn' to='/' onClick={exit}>Выйти из аккаунта</NavLink>
                    </>}
                    {isActive && <>
                    <span className='profile__err'>{err}</span>
                    <button className='profile__save-btn' onClick={setActive} type='submit' disabled={!formValid}>Сохранить</button>
                    </>}
                </form>
            </section>
        </main>
    )
};

export default Profile;