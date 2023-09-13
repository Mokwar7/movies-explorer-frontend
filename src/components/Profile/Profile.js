/* eslint-disable default-case */
import { NavLink } from 'react-router-dom';
import '../../index.css'
import React from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({exit}) {
    const [isActive, setIsActive] = React.useState(false);
    const user = React.useContext(CurrentUserContext)
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [errorName, setErrorName] = React.useState('')
    const [nameDirty, setNameDirty] = React.useState(false)
    const [formValid, setFormValid] = React.useState(false)
    const err = ''

    React.useEffect(() => {
        setName(user.name)
        setEmail(user.email)
    }, [user])

    React.useEffect(() => {
        document.title = 'Мой аккаунт'
    }, [])

    React.useEffect(() => {
        if (errorName) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [errorName])

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

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
       }
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:3001/users/me`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
          },
          body: JSON.stringify({
            'name': name,
          })
        })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(res)
        })
        .then((result) => {
          setActive()
        })
        .catch((err) => {
          console.log(err)
        })
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
                        <p className='profile__info'>{email}</p>
                    </div>
                    {!isActive && <>
                    <button className='profile__edit-btn' onClick={setActive} type='button'>Редактировать</button>
                    <NavLink className='profile__exit-btn' to='/' onClick={exit}>Выйти из аккаунта</NavLink>
                    </>}
                    {isActive && <>
                    <span className='profile__err'>{err}</span>
                    <button className='profile__save-btn' type='submit' disabled={!formValid}>Сохранить</button>
                    </>}
                </form>
            </section>
        </main>
    )
};

export default Profile;