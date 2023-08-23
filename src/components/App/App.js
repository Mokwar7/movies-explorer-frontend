import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header'
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import ErrorPage from '../ErrorPage/ErrorPage';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/404' element={<ErrorPage />} />
        <Route path='/me' element={<Profile />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
