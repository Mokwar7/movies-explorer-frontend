import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header'
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import ErrorPage from '../ErrorPage/ErrorPage';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/404' element={<ErrorPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
