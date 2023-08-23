import '../../index.css'
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';

function Movies() {
    React.useEffect(() => {
        document.title = 'Фильмы'
    }, [])


    return (
        <>
            <SearchForm />
        </>
    );
}

export default Movies;
