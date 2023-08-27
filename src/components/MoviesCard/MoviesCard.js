import React from 'react';
import '../../index.css';
import deleteImg from '../../images/delete.svg'

function MoviesCard({image, name, duration, isSaved}) {

    return (
        <div className="card">
            <img src={image} alt="фотография карточки фильма" className="card__img" />
            <div className="card__container">
                <div className="card__container-about">
                    <h4 className="card__name">{name}</h4>
                    <p className="card__time">{duration}</p>
                </div>
                {!isSaved && 
                <label className="card__label">
                    <input className="card__checkbox" type='checkbox'></input>
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
