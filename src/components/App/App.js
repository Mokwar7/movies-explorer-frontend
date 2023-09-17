import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import ErrorPage from '../ErrorPage/ErrorPage';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies'
import React from 'react';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import MainApi from '../../utils/MainApi';

function App() {
  const [currentUser, setCurrentUser] = React.useState({})
  const [myMoviesArr, setMyMoviesArr] = React.useState([])
  const [moviesArr, setMoviesArr] = React.useState([])
  const [myAllMoviesArr, setMyAllMoviesArr] = React.useState([])
  const [moviesAllArr, setMoviesAllArr] = React.useState([])
  const [clicked, setClicked] = React.useState(false)
  const [preloader, setPreloader] = React.useState(false)
  const [errSearch, setErrSearch] = React.useState(false)
  const [widthSize, setWidthSize] = React.useState(window.innerWidth)
  const mainApi = new MainApi({
    url: 'https://api.eivom.nomoreparties.co/',
    headers: {
        'Content-Type': 'application/json',
        "Authorization" : localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
    }
  })
  const nav = useNavigate()

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      mainApi.auth()
        .then((data) => {
          setCurrentUser(data.data)
          localStorage.setItem('logged', true)
        })
        .catch((err) => {
          console.log(err)
          localStorage.removeItem('logged')
        })
      window.addEventListener('resize', () => {
        setWidthSize(window.innerWidth)
      })
    }
  }, [])

  function exit() {
    localStorage.removeItem('jwt')
    localStorage.removeItem('logged')
    localStorage.removeItem('searchInput')
    localStorage.removeItem('isShort')
    nav('/', {replace: true})
  }

  function login() {
    mainApi.auth()
        .then((data) => {
          setCurrentUser(data.data)
          localStorage.setItem('logged', true)
          nav('/movies', {replace: true})
        })
        .catch((err) => {
          console.log(err)
          localStorage.removeItem('logged')
        })
  }

  function handleSaveClick(data) {
    return fetch('https://api.eivom.nomoreparties.co/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
          },
          body: JSON.stringify({
            'country': data.country,
            'director': data.director,
            'duration': data.duration,
            'year': data.year,
            'description': data.description,
            'image': `https://api.nomoreparties.co${data.image.url}`,
            'trailerLink': data.trailerLink,
            'nameRU': data.nameRU,
            'nameEN': data.nameEN,
            'thumbnail': `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
            'movieId': data.id,
          })
        })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(res)
        })
        .catch((err) => {
          console.log(err)
        })
  }

  function handleDeleteClick(id) {
    return fetch(`https://api.eivom.nomoreparties.co/movies/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
          },
        })
        .then((res) => {
          if (res.ok) {
            setMyMoviesArr(myMoviesArr.filter((film) => film.movieId !== id))
            setMyAllMoviesArr(myMoviesArr.filter((film) => film.movieId !== id))
            return res.json()
          }
          return Promise.reject(res)
        })
        .catch((err) => {
          console.log(err)
        })
  }

  function handleSearchMovies(checked, searchInput) {
    localStorage.setItem('searchInput', (searchInput === '' ? null : searchInput))
    localStorage.setItem('isShort', checked)
    setClicked(searchInput + checked)
    setPreloader(true)

    if (checked === false) {
      setMoviesArr(moviesAllArr.filter((film) => film.nameEN.toLowerCase().includes(searchInput.toLowerCase()) || film.nameRU.toLowerCase().includes(searchInput.toLowerCase())))
    } else {
      setMoviesArr(moviesAllArr.filter((film) => film.duration <= 40 && (film.nameEN.toLowerCase().includes(searchInput.toLowerCase()) || film.nameRU.toLowerCase().includes(searchInput.toLowerCase()))))
    }

    setPreloader(false)
    setErrSearch(false)
  }

  function handleSearchSavedMovies(checked, searchInput) {
    setClicked(searchInput + checked)
    setPreloader(true)

    if (myAllMoviesArr.length > 0) {
      if (checked === false) {
        setMyMoviesArr(myAllMoviesArr.filter((film) => film.nameEN.toLowerCase().includes(searchInput.toLowerCase()) || film.nameRU.toLowerCase().includes(searchInput.toLowerCase())))
      } else {
        setMyMoviesArr(myAllMoviesArr.filter((film) => film.duration <= 40 && (film.nameEN.toLowerCase().includes(searchInput.toLowerCase()) || film.nameRU.toLowerCase().includes(searchInput.toLowerCase()))))
      }
    }

    setPreloader(false)
  }

  function onLoadSavedMoviesSearch() {
    setPreloader(true)

    mainApi.getMovies()
      .then((result) => {
        return result
      })
      .then((res) => {
        setMyAllMoviesArr(res.data)
        setMyMoviesArr(res.data)
        setPreloader(false)
        setErrSearch(false)
      })
      .catch((err) => {
      console.log(err)
      setPreloader(false)
      setErrSearch(true)
      })
  }

  function onLoadMoviesSearch(checked, searchInp) {
    const searchInput = checked === undefined ? localStorage.getItem('searchInput') : searchInp
    const isShort = searchInp === undefined ? localStorage.getItem('isShort') : checked
    localStorage.setItem('searchInput', searchInput)
    localStorage.setItem('isShort', isShort)
    setPreloader(true)
    setMoviesArr([])
    setMoviesAllArr([])

    fetch('https://api.nomoreparties.co/beatfilm-movies', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        mainApi.getMovies()
          .then((result) => {
            res.forEach(element => {
              if (result.data !== undefined) {
                result.data.filter((film) => film.movieId === element.id ? element.lol = 12 : '')
              }
            });
            setMoviesAllArr(res)
            if (isShort === 'false' || isShort === false) {
              res = res.filter((film) => film.nameEN.toLowerCase().includes(searchInput.toLowerCase()) || film.nameRU.toLowerCase().includes(searchInput.toLowerCase()))
            } else if (isShort === 'true' || isShort === true) {
              res = res.filter((film) => film.duration <= 40 && (film.nameEN.toLowerCase().includes(searchInput.toLowerCase()) || film.nameRU.toLowerCase().includes(searchInput.toLowerCase())))
            }
            setMoviesArr(res)
          })
          .catch((err) => {
            console.log(err)
          })
        setPreloader(false)
        setErrSearch(false)
      })
      .catch((err) => {
       console.log(err)
       setPreloader(false)
       setErrSearch(true)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/signup' element={<Register login={login} />} />
          <Route path='/signin' element={<Login login={login} />} />
          <Route path='/404' element={<ErrorPage />} />
          <Route path='/' element={<Main />} />
          <Route path='/profile' element={<ProtectedRouteElement 
            element={Profile}
            exit={exit}
          />}/>
          <Route path='/movies' element={<ProtectedRouteElement 
            element={Movies}
            onLoadMoviesSearch={onLoadMoviesSearch}
            search={handleSearchMovies}
            clicked={clicked}
            preloader={preloader}
            errSearch={errSearch}
            handleSaveClick={handleSaveClick}
            handleDeleteClick={handleDeleteClick}
            arr={moviesArr}
            widthSize={widthSize}
          />}/>
          <Route path='/saved-movies' element={<ProtectedRouteElement 
            element={SavedMovies}
            search={handleSearchSavedMovies}
            onLoadSavedMoviesSearch={onLoadSavedMoviesSearch}
            clicked={clicked}
            preloader={preloader}
            errSearch={errSearch}
            handleSaveClick={handleSaveClick}
            handleDeleteClick={handleDeleteClick}
            arr={myMoviesArr}
            widthSize={widthSize}
          />}/>
          <Route path='*' element={<Navigate to='/404' />} />
          </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
