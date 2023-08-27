import React from 'react';
import '../../index.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import cardImg from '../../images/card_img.png'
import { useLocation } from 'react-router-dom';

function MoviesCardList() {
    const [isSaved, setIsSaved] = React.useState(false)
    let location = useLocation()

    React.useEffect(() => {
        if ('/movies' === location.pathname) {
            setIsSaved(false)
        } else if ('/saved-movies' === location.pathname) {
            setIsSaved(true)
        }
    }, [location])

    //Здесь имитация карточек, в будущем, с помощью цикла и данных с апи будут карточки подгружаться
    //Также, когда будет интеграция с апи, кнопка "Еще" будет пропадать, если впервый раз придет меньше 16 карточек
    return (
        <div className="movies-list">
            <div className="movies-list__container">
                <MoviesCard image={cardImg} name='Новогодняя песня' duration='4м' isSaved={isSaved}/>
                <MoviesCard image={cardImg} name='Новогодняя песня' duration='4м' isSaved={isSaved}/>
                <MoviesCard image={cardImg} name='Новогодняя песня' duration='4м' isSaved={isSaved}/>
                <MoviesCard image={cardImg} name='Новогодняя песня' duration='4м' isSaved={isSaved}/>
                <MoviesCard image={cardImg} name='Новогодняя песня' duration='4м' isSaved={isSaved}/>
                <MoviesCard image={cardImg} name='Новогодняя песня' duration='4м' isSaved={isSaved}/>
                <MoviesCard image={cardImg} name='Новогодняя песня' duration='4м' isSaved={isSaved}/>
                <MoviesCard image={cardImg} name='Новогодняя песня' duration='4м' isSaved={isSaved}/>
                <MoviesCard image={cardImg} name='Новогодняя песня' duration='4м' isSaved={isSaved}/>
                <MoviesCard image={cardImg} name='Новогодняя песня' duration='4м' isSaved={isSaved}/>
                <MoviesCard image={cardImg} name='Новогодняя песня' duration='4м' isSaved={isSaved}/>
                <MoviesCard image={cardImg} name='Новогодняя песня' duration='4м' isSaved={isSaved}/>
                <MoviesCard image={cardImg} name='Новогодняя песня' duration='4м' isSaved={isSaved}/>
                <MoviesCard image={cardImg} name='Новогодняя песня' duration='4м' isSaved={isSaved}/>
                <MoviesCard image={cardImg} name='Новогодняя песня' duration='4м' isSaved={isSaved}/>
                <MoviesCard image={cardImg} name='Новогодняя песня' duration='4м' isSaved={isSaved}/>
            </div>
            <div className="movies-list__more">
                <button className='movies-list__more-btn'>
                    Ещё
                </button>
            </div>
        </div>
    );
}

export default MoviesCardList;
