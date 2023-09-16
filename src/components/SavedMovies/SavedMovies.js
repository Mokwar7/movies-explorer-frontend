import '../../index.css'
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({arr, search, widthSize, onLoadSavedMoviesSearch, clicked, preloader, errSearch, handleSaveClick, handleDeleteClick}) {
    React.useEffect(() => {
        document.title = 'Сохранённые фильмы'
        localStorage.setItem('lastPage', '/saved-movies')
    }, [])


    return (
        <main>  
            <SearchForm search={search} onLoadSearch={onLoadSavedMoviesSearch} />
            <MoviesCardList arr={arr} clicked={clicked} widthSize={widthSize} preloader={preloader} errSearch={errSearch} handleSaveClick={handleSaveClick} handleDeleteClick={handleDeleteClick} />
        </main>
    );
}

export default SavedMovies