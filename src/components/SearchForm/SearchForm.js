import React from 'react';
import '../../index.css'
import searchIcon from '../../images/search_icon_gray.svg'

function SearchForm() {
    const [checked, setChecked] = React.useState(true)

    function handleCheck() {
        setChecked(!checked)
    }

    function handleSubmit(e) {
        console.log('GG form')
        e.preventDefault()
    }

    return (
        <form className='search' onSubmit={handleSubmit}>
            <div className='search__container'>
                <label className='search__label-input'>
                    <img className='search__icon' src={searchIcon} alt='значок поиска' />
                    <input className='search__input' placeholder='Фильм'></input>
                </label>
                <div className='search__container-etc'>
                    <button className='search__button' type='submit'></button>
                    <span className='search__line'></span>
                    <div className='search__container-short'>
                        <label className='search__label-checkbox'>
                            <input className='search__checkbox' type='checkbox' checked={checked} onChange={handleCheck}></input>
                            <span className='search__slider'></span>
                        </label>
                        <p className='search__text'>Короткометражки</p>
                    </div>
                </div>
            </div> 
        </form>
    );
}

export default SearchForm;
