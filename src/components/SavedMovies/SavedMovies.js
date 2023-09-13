import '../../index.css'
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({search, arr, myArr, clicked, preloader, errSearch, handleSaveClick, handleDeleteClick}) {
    React.useEffect(() => {
        document.title = 'Сохранённые фильмы'
    }, [])


    return (
        <main>  
            <SearchForm search={search} />
            <MoviesCardList arr={arr} myArray={myArr} clicked={clicked} preloader={preloader} errSearch={errSearch} handleSaveClick={handleSaveClick} handleDeleteClick={handleDeleteClick} />
        </main>
    );
}

export default SavedMovies