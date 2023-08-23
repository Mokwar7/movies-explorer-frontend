import '../../index.css'

function SearchForm() {
    return (
        <form className='search'>
            <div className='search__container'>
                <input className='search__input' placeholder='Фильм'></input>
                <button className='search__button' type='submit'></button>
                <span className='search__line'></span>
                <input className='search__checkbox' type='checkbox'></input>
                <p className='search__text'>Короткометражки</p>
            </div> 
        </form>
    );
}

export default SearchForm;
