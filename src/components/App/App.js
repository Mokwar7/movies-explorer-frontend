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
  const [arr, setArr] = React.useState([])
  const [myArr, setMyArr] = React.useState([])
  const [allArr, setAllArr] = React.useState([])
  const [allMyArr, setAllMyArr] = React.useState([])
  const [clicked, setClicked] = React.useState(false)
  const [preloader, setPreloader] = React.useState(false)
  const [errSearch, setErrSearch] = React.useState(false)
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
        })
        .catch((err) => {
          console.log(err)
          localStorage.removeItem('logged')
        })
  }

  function search(checked, searchInput) {
    localStorage.setItem('searchInput', searchInput)
    localStorage.setItem('isShort', checked)
    setClicked(true)
    setPreloader(true)
    if (arr.length > 0) {
      if (checked === false) {
        setArr(allArr.filter((film) => film.duration > 40 && (film.nameEN.toLowerCase().includes(searchInput.toLowerCase()) || film.nameRU.toLowerCase().includes(searchInput.toLowerCase()))))
      } else {
        setArr(allArr.filter((film) => film.nameEN.toLowerCase().includes(searchInput.toLowerCase()) || film.nameRU.toLowerCase().includes(searchInput.toLowerCase())))
      }
      setPreloader(false)
      setErrSearch(false)
    } else {
    fetch('https://api.nomoreparties.co/beatfilm-movies', {
     method: 'GET',
     headers: {
       "Content-Type": "application/json"
     },
   })
     .then((res) => {
       setArr([])
       return res.json()
     })
     .then((res) => {
       if (checked === false) {
          setAllArr(res)
          setArr(res.filter((film) => film.duration > 40 && (film.nameEN.toLowerCase().includes(searchInput.toLowerCase()) || film.nameRU.toLowerCase().includes(searchInput.toLowerCase()))))
       } else {
          setAllArr(res)
          setArr(res.filter((film) => film.nameEN.toLowerCase().includes(searchInput.toLowerCase()) || film.nameRU.toLowerCase().includes(searchInput.toLowerCase())))
       }
       setPreloader(false)
       setErrSearch(false)
     })
     .catch((err) => {
      console.log(err)
      setPreloader(false)
      setErrSearch(true)
    })}
  }

  function search2(checked, searchInput) {
    setClicked(true)
    setPreloader(true)
    if (myArr.length > 0) {
      if (checked === false) {
        setMyArr(allMyArr.filter((film) => film.duration > 40 && (film.nameEN.toLowerCase().includes(searchInput.toLowerCase()) || film.nameRU.toLowerCase().includes(searchInput.toLowerCase()))))
      } else {
        setMyArr(allMyArr.filter((film) => film.nameEN.toLowerCase().includes(searchInput.toLowerCase()) || film.nameRU.toLowerCase().includes(searchInput.toLowerCase())))
      }
      setPreloader(false)
      setErrSearch(false)
    } else {
    mainApi.getMovies()
      .then((result) => {
        setMyArr([])
        return result
      })
      .then((res) => {
       if (checked === false) {
        setAllMyArr(res.data)
        setMyArr(res.data.filter((film) => film.duration > 40 && (film.nameEN.toLowerCase().includes(searchInput.toLowerCase()) || film.nameRU.toLowerCase().includes(searchInput.toLowerCase()))))
       } else {
        setAllMyArr(res.data)
        setMyArr(res.data.filter((film) => film.nameEN.toLowerCase().includes(searchInput.toLowerCase()) || film.nameRU.toLowerCase().includes(searchInput.toLowerCase())))
       }
       setPreloader(false)
       setErrSearch(false)
      })
     .catch((err) => {
      console.log(err)
      setPreloader(false)
      setErrSearch(true)
    })}
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
            return res.json()
          }
          return Promise.reject(res)
        })
        .catch((err) => {
          console.log(err)
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
            search={search}
            clicked={clicked}
            preloader={preloader}
            errSearch={errSearch}
            handleSaveClick={handleSaveClick}
            handleDeleteClick={handleDeleteClick}
            arr={arr}
          />}/>
          <Route path='/saved-movies' element={<ProtectedRouteElement 
            element={SavedMovies}
            search={search2}
            clicked={clicked}
            preloader={preloader}
            errSearch={errSearch}
            handleSaveClick={handleSaveClick}
            handleDeleteClick={handleDeleteClick}
            arr={arr}
            myArr={myArr}
          />}/>
          <Route path='*' element={<Navigate to='/404' />} />
          </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
