import React from 'react';
import '../../index.css'
import searchIcon from '../../images/search_icon_gray.svg'

function SearchForm() {
    const [checked, setChecked] = React.useState(true)
    const [arr, setArr] = React.useState([])

    function handleCheck() {
        setChecked(!checked)
    }

    function handleSubmit(e) {
        e.preventDefault()
        search()
    }

    function search() {
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
            setArr(res)
            console.log('a')
          })
          .catch(err => console.log(err))
    }

    React.useEffect(() => {
        console.log(arr.filter((film) => film.country === 'Испания'))
    }, [arr])

    return (
        <section>
            <form className='search' onSubmit={handleSubmit}>
                <div className='search__container'>
                    <label className='search__label-input'>
                        <img className='search__icon' src={searchIcon} alt='значок поиска' />
                        <input className='search__input' placeholder='Фильм' required></input>
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
        </section>
    );
}

export default SearchForm;
