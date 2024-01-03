import React from 'react';
import '../../index.css';
import deleteImg from '../../images/delete.svg'
import { NavLink } from 'react-router-dom';

function MoviesCard({isSaved, handleSaveClick, data, handleDeleteClick}) {
    const [checked, setChecked] = React.useState(false)
    const [minutes, setMinutes] = React.useState(0)
    const [hours ,setHours] = React.useState(0)

    React.useEffect(() => {
      if (data.lol === 12) {
        setChecked(true)
      }
      if (data.duration < 60) {
        setMinutes(data.duration)
    } else {
        setHours(Math.floor(data.duration / 60))
        setMinutes(data.duration % 60)
    }
    }, [])
    
    function onLoading() {}

    function handleDeleteClickBtn() {
      handleDeleteClick(data.movieId)
    }

    function handleSaveClickBtn() {
        if (!checked) {
            handleSaveClick(data)
        } else {
            handleDeleteClick(data.id)
        }
        setChecked(!checked)
    }

    return (
        <div className="card">
            <a href={data.trailerLink} target="_blank" rel='noreferrer'><img src={data.image.url ? 'https://api.nomoreparties.co' + data.image.url : data.image} alt={'фотография ' + data.nameRU} className="card__img" /></a>
            <div className="card__container">
                <div className="card__container-about">
                    <h2 className="card__name">{data.nameRU}</h2>
                    <p className="card__time">{hours ? `${hours}ч${minutes}мин` : `${minutes}мин`}</p>
                </div>
                {!isSaved && 
                <label className="card__label">
                    <input className="card__checkbox" type='checkbox' checked={checked} onChange={onLoading} onClick={handleSaveClickBtn}></input>
                    <span className="card__span"></span>
                </label>
                }
                {isSaved &&
                    <img src={deleteImg} alt='значок удаления фильма из сохраненных' className='card__delete' onClick={handleDeleteClickBtn}/>
                }
            </div>
        </div>
    );
}

export default MoviesCard;
