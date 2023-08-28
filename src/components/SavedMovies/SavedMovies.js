import '../../index.css'
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
    React.useEffect(() => {
        document.title = 'Сохранённые фильмы'
    }, [])


    return (
        <>  
            <SearchForm />
            <MoviesCardList />
        </>
    );
}

export default SavedMovies