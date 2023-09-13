import React from 'react';
import '../../index.css'
import searchIcon from '../../images/search_icon_gray.svg'
import { useLocation } from 'react-router-dom';

function SearchForm({search}) {
    const [checked, setChecked] = React.useState(true)
    const [searchInput, setSearchInput] = React.useState('')
    const [isSavedPage, setIsSavedPage] = React.useState(false)
    let location = useLocation()

    React.useEffect(() => {
        if (location.pathname === '/saved-movies') {
            setIsSavedPage(true)
        } else if (location.pathname === '/movies') {
            setIsSavedPage(false)
        }

        if (localStorage.getItem('searchInput') !== null && localStorage.getItem('isShort') !== null && location.pathname === '/movies') {
            if (localStorage.getItem('isShort') === 'false') {
                setChecked(false)
            } else {
                setChecked(true)
            }
            setSearchInput(localStorage.getItem('searchInput'))
            search(localStorage.getItem('isShort'), localStorage.getItem('searchInput'))
        } else {
            setChecked(true)
            setSearchInput('')
        }        
    }, [])

    function handleSearch(e) {
        setSearchInput(e.target.value)
    }

    function handleCheck() {
        setChecked(!checked)
    }

    function handleCheckClick() {
        handleCheck()
    }

    function handleSubmit(e) {
        e.preventDefault()
        search(checked, searchInput)
    }

    return (
        <section>
            <form className='search' onSubmit={handleSubmit}>
                <div className='search__container'>
                    <label className='search__label-input'>
                        <img className='search__icon' src={searchIcon} alt='значок поиска' />
                        <input type='input' className='search__input' placeholder='Фильм' onChange={handleSearch} value={searchInput}></input>
                    </label>
                    <div className='search__container-etc'>
                        <button className='search__button' type='submit'></button>
                        <span className='search__line'></span>
                        <div className='search__container-short'>
                            <label className='search__label-checkbox' >
                                <input className='search__checkbox' type='checkbox' checked={checked} onChange={handleCheck} onClick={handleCheckClick}></input>
                                <span className='search__slider'></span>
                            </label>
                            <p className='search__text'>Короткометражки</p>
                        </div>
                    </div>
                </div> 
            </form>
        </section>
    );
}

export default SearchForm;
