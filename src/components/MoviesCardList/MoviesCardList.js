import React from 'react';
import '../../index.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import MainApi from '../../utils/MainApi';

function MoviesCardList({arr, clicked, preloader, myArray, errSearch, handleSaveClick, handleDeleteClick}) {
    const [isSaved, setIsSaved] = React.useState(false)
    const [maxCards, setMaxCards] = React.useState(16)
    const [myArr, setMyArr] = React.useState([])
    const [widthSize, setWidthSize] = React.useState(window.innerWidth)
    const [grade, setGrade] = React.useState(4)
    const [isSavedPage, setIsSavedPage] = React.useState(false)
    const mainApi = new MainApi({
        url: 'http://localhost:3001/',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
        }
    })
    let maxWidth = 16
    let midWidth = 12
    let min2Width = 8
    let minWidth = 5
    let count = 0
    let location = useLocation()

    React.useEffect(() => {
            setMyArr(myArray)
    }, [myArray])

    React.useEffect(() => {
        window.addEventListener('resize', () => {
            setWidthSize(window.innerWidth)
        })
        
        if (widthSize > 1023 && widthSize < 1181) {
            setMaxCards(midWidth)
        } else if (widthSize > 767 && widthSize < 1024) {
            setMaxCards(min2Width)
        } else if (widthSize < 768) {
            setMaxCards(minWidth)
        } else {
            setMaxCards(maxWidth)
        }

        if (location.pathname === '/saved-movies') {
            setIsSavedPage(true)
        } else if (location.pathname === '/movies') {
            setIsSavedPage(false)
        }
    }, [])

    React.useEffect(() => {
        if (widthSize > 1023 && widthSize < 1181) {
            setGrade(3)
        } else if (widthSize > 767 && widthSize < 1024) {
            setGrade(2)
        } else if (widthSize < 768) {
            setGrade(1)
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

    React.useEffect(() => {
        mainApi.getMovies()
          .then((result) => {
            setMyArr(result.data)
          })
          .catch((err) => {
            console.log(err)
          })
    }, [arr])


    arr.forEach(element => {
        if (myArr !== undefined) {
            myArr.filter((film) => film.movieId === element.id ? element.lol = 12 : '')
        }
    });

    function handleDeleteClickBtn(id) {
        handleDeleteClick(id)
        setMyArr(myArr.filter((film) => film.movieId !== id))
    }

    return (
        <section className="movies-list">
            <div className="movies-list__container">
                {
                    preloader
                    ? <Preloader /> 
                    : !isSavedPage 
                    ? arr.map((film) => {
                        count++
                        if (count <= maxCards) {
                            return (
                                <MoviesCard key={film.id} handleSaveClick={handleSaveClick} data={film} isSaved={isSaved} handleDeleteClick={handleDeleteClick} />
                            )
                        }
                    }) 
                    : myArr.map((film) => {
                        count++
                        if (count <= maxCards) {
                            return (
                                <MoviesCard key={film.movieId} handleSaveClick={handleSaveClick} data={film} isSaved={isSaved} handleDeleteClick={handleDeleteClickBtn} />
                            )
                        }
                    })
                }
                {
                    location.pathname === '/movies' && !preloader && clicked && arr.length < 1? 
                    <div className='movies-list__nth'> 
                        {errSearch ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' : 'Ничего не найдено'}
                    </div> : []
                }
                {
                    location.pathname === '/saved-movies' && !preloader && clicked && myArr.length < 1 ? 
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
            {
                location.pathname ==='/saved-movies' && !preloader && myArr.length > maxCards
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
