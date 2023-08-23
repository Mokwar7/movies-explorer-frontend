import '../../index.css'
import React from 'react'

function Profile() {
    const [isActive, setIsActive] = React.useState(false);
    //Подставил данные вместо БД
    const [name, setName] = React.useState('Олег');
    const [email, setEmail] = React.useState('pochta@yandex.ru');
    const err = 'При обновлении профиля произошла ошибка.'

    React.useEffect(() => {
        document.title = 'Аккаунт'
    }, [])

    function setActive() {
        setIsActive(!isActive)
    }

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleSubmit(e) {
        console.log('GG form')
        e.preventDefault()
    }

    return (
        <form className='profile' name='profile' onSubmit={handleSubmit}>
            <h3 className='profile__header'>
                Привет, {name}!
            </h3>
            <div className='profile__container'>
                <p className='profile__type-info'>Имя</p>
                {!isActive && <p className='profile__info'>{name}</p>}
                {isActive && <input className='profile__input' value={name} onChange={handleChangeName} placeholder='Виталий'></input>}
            </div>
            <div className='profile__container'>
                <p className='profile__type-info'>E-mail</p>
                {!isActive && <p className='profile__info'>{email}</p>}
                {isActive && <input className='profile__input' value={email} onChange={handleChangeEmail} placeholder='pochta@yandex.ru'></input>}
            </div>
            {!isActive && <>
            <button className='profile__edit-btn' onClick={setActive} type='button'>Редактировать</button>
            <button className='profile__exit-btn' type='button'>Выйти из аккаунта</button>
            </>}
            {isActive && <>
            <span className='profile__err'>{err}</span>
            <button className='profile__save-btn' onClick={setActive} type='submit'>Сохранить</button>
            </>}
        </form>
    )
};

export default Profile;