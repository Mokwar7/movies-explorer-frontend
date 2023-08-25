import React from 'react';
import '../../index.css'
import searchIcon from '../../images/search_icon_gray.svg'

function SearchForm() {
    const [checked, setChecked] = React.useState(true)

    function handleCheck() {
        setChecked(!checked)
    }

    return (
        <form className='search'>
            <div className='search__container'>
                <label className='search__label-input'>
                    <img className='search__icon' src={searchIcon} alt='значок поиска' />
                    <input className='search__input' placeholder='Фильм'></input>
                </label>
                <div className='search__container-etc'>
                    <button className='search__button' type='submit'></button>
                    <span className='search__line'></span>
                    <label className='search__label-checkbox'>
                        <input className='search__checkbox' type='checkbox' checked={checked} onChange={handleCheck}></input>
                        <span className='search__slider'></span>
                    </label>
                    <p className='search__text'>Короткометражки</p>
                </div>
            </div> 
        </form>
    );
}

export default SearchForm;
