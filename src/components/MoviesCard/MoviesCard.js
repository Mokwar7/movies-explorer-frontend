import React from 'react';
import '../../index.css';
import deleteImg from '../../images/delete.svg'

function MoviesCard({isSaved, handleSaveClick, data, handleDeleteClick}) {
    const [checked, setChecked] = React.useState(false)
    let minutes
    let hours

    if (data.duration < 60) {
        minutes = data.duration
    } else {
        hours = Math.floor(data.duration / 60)
        minutes = data.duration % 60
    }

    function handleSaveClickBtn() {
        if (!checked) {
            handleSaveClick(data)
        } else {
            handleDeleteClick(data)
        }
        setChecked(!checked)

        return fetch(`http://localhost:3001/movies`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
          },
        })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(res)
        })
        .then((result) => {
          console.log(result)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    return (
        <div className="card">
            <img src={'https://api.nomoreparties.co' + data.image.url} alt={'фотография ' + data.nameRU} className="card__img" />
            <div className="card__container">
                <div className="card__container-about">
                    <h2 className="card__name">{data.nameRU}</h2>
                    <p className="card__time">{hours ? `${hours}ч${minutes}мин` : `${minutes}мин`}</p>
                </div>
                {!isSaved && 
                <label className="card__label">
                    <input className="card__checkbox" type='checkbox' onClick={handleSaveClickBtn}></input>
                    <span className="card__span"></span>
                </label>
                }
                {isSaved &&
                    <img src={deleteImg} alt='значок удаления фильма из сохраненных' className='card__delete' />
                }
            </div>
        </div>
    );
}

export default MoviesCard;
