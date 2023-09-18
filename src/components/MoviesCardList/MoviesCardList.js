import React from 'react';
import '../../index.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import MainApi from '../../utils/MainApi';

function MoviesCardList({arr, clicked, preloader, errSearch, handleSaveClick, handleDeleteClick, widthSize}) {
    const [isSaved, setIsSaved] = React.useState(false)
    const [maxCards, setMaxCards] = React.useState(16)
    const [grade, setGrade] = React.useState(4)
    const maxWidth = 16
    const midWidth = 12
    const min2Width = 8
    const minWidth = 5
    let count = 0
    let location = useLocation()

    React.useEffect(() => {
        if (window.innerWidth > 1023 && window.innerWidth < 1181) {
            setMaxCards(midWidth)
            setGrade(3)
        } else if (window.innerWidth >= 767 && window.innerWidth <= 1023) {
            setMaxCards(min2Width)
            setGrade(2)
        } else if (window.innerWidth < 767) {
            setMaxCards(minWidth)
            setGrade(2)
        } else {
            setMaxCards(maxWidth)
            setGrade(4)
        }
    }, [])

    React.useEffect(() => {        
        if (window.innerWidth > 1023 && window.innerWidth < 1181) {
            setMaxCards(midWidth)
        } else if (window.innerWidth >= 767 && window.innerWidth <= 1023) {
            setMaxCards(min2Width)
        } else if (window.innerWidth < 767) {
            setMaxCards(minWidth)
        } else {
            setMaxCards(maxWidth)
        }
    }, [clicked])

    React.useEffect(() => {
        if (window.innerWidth > 1023 && window.innerWidth < 1181) {
            setGrade(3)
        } else if (window.innerWidth <= 1023) {
            setGrade(2)
        } else {
            setGrade(4)
        }
    }, [widthSize])

    React.useEffect(() => {
        if ('/movies' === location.pathname) {
            setIsSaved(false)
        } else if ('/saved-movies' === location.pathname) {
            setIsSaved(true)
        }
    }, [location])

    function moreCards() {
        setMaxCards(maxCards + grade)
    }

    function handleDeleteClickBtn(id) {
        handleDeleteClick(id)
    }

    return (
        <section className="movies-list">
            <div className="movies-list__container">
                {
                    preloader
                    ? <Preloader /> 
                    : location.pathname === '/movies' 
                    ? arr.map((film) => {
                        count++
                        if (count <= maxCards) {
                            return (
                                <MoviesCard key={film.id} handleSaveClick={handleSaveClick} data={film} isSaved={isSaved} handleDeleteClick={handleDeleteClick} />
                            )
                        }
                    })
                    : arr.map((film) => {
                        return (
                            <MoviesCard key={film.movieId} handleSaveClick={handleSaveClick} data={film} isSaved={isSaved} handleDeleteClick={handleDeleteClickBtn} />
                        )
                    })
                }
                {
                    location.pathname === '/movies' && !preloader && clicked && arr.length < 1? 
                    <div className='movies-list__nth'> 
                        {errSearch ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' : 'Ничего не найдено'}
                    </div> : []
                }
                {
                    location.pathname === '/saved-movies' && !preloader && clicked && arr.length < 1 ? 
                    <div className='movies-list__nth'> 
                        {errSearch ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' : 'Ничего не найдено'}
                    </div> : []
                }
            </div>
            {
                location.pathname === '/movies' && !preloader && arr.length > maxCards
                ? 
                <div className="movies-list__more">
                    <button className='movies-list__more-btn' onClick={moreCards}> Ещё </button>
                </div>
                : []
            }
        </section>
    );
}

export default MoviesCardList;
