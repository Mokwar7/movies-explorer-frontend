import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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

function App() {
  const [currentUser, setCurrentUser] = React.useState({})
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const nav = useNavigate()

  React.useEffect(() => {
    console.log(currentUser)
  }, [currentUser])

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      fetch(`http://localhost:3001/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
          setCurrentUser(data.data)
          setIsLoggedIn(true)
          nav('/', {replace: true})
        })
        .catch(err => console.log(err))
    }
  }, [])

  function exit() {
    localStorage.removeItem('jwt')
    nav('/', {replace: true})
    setIsLoggedIn(false)
  }

  function login() {
    setIsLoggedIn(true)
    fetch(`http://localhost:3001/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
          setCurrentUser(data.data)
          setIsLoggedIn(true)
          nav('/', {replace: true})
        })
        .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login login={login} />} />
          <Route path='/404' element={<ErrorPage />} />
          <Route path='/' element={<Main />} />
          <Route path='/profile' element={<ProtectedRouteElement 
            element={Profile}
            isLoggedIn={isLoggedIn}
            exit={exit}
          />}/>
          <Route path='/movies' element={<ProtectedRouteElement 
            element={Movies}
            isLoggedIn={isLoggedIn}
          />}/>
          <Route path='/saved-movies' element={<ProtectedRouteElement 
            element={SavedMovies}
            isLoggedIn={isLoggedIn}
          />}/>
          <Route path='*' element={<Navigate to='/404' />} />
          </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
