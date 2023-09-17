import React from 'react';
import '../../index.css'
import searchIcon from '../../images/search_icon_gray.svg'
import { useLocation } from 'react-router-dom';

function SearchForm({search, onLoadSearch}) {
    const [checked, setChecked] = React.useState(false)
    const [searchInput, setSearchInput] = React.useState('')
    const [firstSearch ,setFirstSearch] = React.useState(false)
    let location = useLocation()

    React.useEffect(() => {
        if (location.pathname === '/movies') {
            if (localStorage.getItem('isShort') === 'false' || localStorage.getItem('isShort') === null) {
                setChecked(false)
            } else {
                setChecked(true)
            }
            if (localStorage.getItem('isShort') !== null && localStorage.getItem('searchInput') !== 'null' && localStorage.getItem('searchInput') !== '') {
                setSearchInput(localStorage.getItem('searchInput'))
                onLoadSearch()
                setFirstSearch(true)
            }
        } else {
            setChecked(false)
            setSearchInput('')
            onLoadSearch()
        }
    }, [])

    function handleSearch(e) {
        setSearchInput(e.target.value)
    }

    function handleCheck() {
        
    }

    function handleCheckClick() {
        if (location.pathname === '/movies') {
            if (!firstSearch) {
                onLoadSearch(!checked, searchInput)
                setFirstSearch(true)
            } else {
                search(!checked, searchInput)
            }
        } else {
            search(!checked, searchInput)
        }
        setChecked(!checked)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (location.pathname === '/movies') {
            if (!firstSearch) {
                onLoadSearch(checked, searchInput)
                setFirstSearch(true)
            } else {
                search(checked, searchInput)
            }
        } else {
            search(checked, searchInput)
        }
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
