import '../../index.css'
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({search, arr, clicked, preloader, errSearch, handleSaveClick, handleDeleteClick}) {
    React.useEffect(() => {
        document.title = 'Фильмы'
        localStorage.setItem('lastPage', '/movies')
    }, [])


    return (
        <main>
            <SearchForm search={search} />
            <MoviesCardList arr={arr} clicked={clicked} preloader={preloader} errSearch={errSearch} handleSaveClick={handleSaveClick} handleDeleteClick={handleDeleteClick} />
        </main>
    );
}

export default Movies;
