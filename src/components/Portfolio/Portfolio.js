import '../../index.css'

function Portfolio() {
    return (
        <section className='portfolio'>
            <h3 className='portfolio__header'>Портфолио</h3>
            <div className='portfolio__container-about'>
                <a href='https://github.com/Mokwar7/how-to-learn' target="_blank" rel='noreferrer' className='portfolio__link'>
                    <p className='portfolio__text'>Статичный сайт</p>
                    <p className='portfolio__arr'>&#x2197;</p>
                </a>
                <a href='https://mokwar7.github.io/russian-travel/index.html' target="_blank" rel='noreferrer' className='portfolio__link'>
                    <p className='portfolio__text'>Адаптивный сайт</p>
                    <p className='portfolio__arr'>&#x2197;</p>
                </a>
                <a href='https://github.com/Mokwar7/react-mesto-api-full-gha' target="_blank" rel='noreferrer' className='portfolio__link'>
                    <p className='portfolio__text'>Одностраничное приложение</p>
                    <p className='portfolio__arr'>&#x2197;</p>
                </a>
            </div>
        </section>
    )
};

export default Portfolio;
