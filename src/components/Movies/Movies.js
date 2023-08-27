import '../../index.css'
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
    React.useEffect(() => {
        document.title = 'Фильмы'
    }, [])


    return (
        <>
            <SearchForm />
            <MoviesCardList />
        </>
    );
}

export default Movies;
