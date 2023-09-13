import '../../index.css'
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({search, arr, clicked, preloader, errSearch, handleSaveClick, handleDeleteClick}) {
    React.useEffect(() => {
        document.title = 'Фильмы'
    }, [])

    const [myArr, setMyArr] = React.useState([])

    React.useEffect(() => {
        fetch(`http://localhost:3001/movies`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "Authorization" : localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
            },
          })
          .then((res) => {
            if (res.ok) {
              return res.json()
            }
            return Promise.reject(res)
          })
          .then((result) => {
            setMyArr(result.data)
            console.log(result)
          })
          .catch((err) => {
            console.log(err)
          })
    }, [])
    


    return (
        <main>
            <SearchForm search={search} />
            <MoviesCardList arr={arr} myArrayS={myArr} clicked={clicked} preloader={preloader} errSearch={errSearch} handleSaveClick={handleSaveClick} handleDeleteClick={handleDeleteClick} />
        </main>
    );
}

export default Movies;
